---
layout: post
title:  "Setup eines Mesos-Clusters in einer AWS VPC"
date:   2016-02-09 22:45:18 +0100
categories: mesos marathon aws docker cluster
---
 
Es ist wieder Urlaubszeit und das heißt: Zeit zum spielen. Dieses mal habe ich mich damit beschäftigt, einen skalierbaren 
Mesos-Cluster mit Marathon und Docker in AWS aufzusetzen. Nun kann man sich fragen, warum man Mesos in AWS aufsetzen möchte,
wo man durch AWS an sich schon Resourcen über verschiedene EC2 Instanzen verteilen und begrenzen kann...

 
 * man kann, je nach Last, die Anzahl der Mesos-Slaves dynamisch erhöhen oder reduzieren
 * man kann eine bessere Auslatung der AWS Instanzen erreichen um Kosten zu reduzieren
 * man kann im Rahmen des AWS Free Tier (fast) kostenlos einen Cluster mit kleinen EC2 Instanzen aufsetzen
 * man kann - verglichen zu lokalen VMs mit Vagrant oder Docker Containern - die "Volumen-Begrenzte" LTE-Flatrate der Schwiegereltern schonen
 
 
## Die Grundidee

Um einen einfachen Cluster aufzusetzen brauchen wir natürlich einen Mesos-Master in einem öffentlichen Subnet, damit er 
von Außerhalb ansprechbar ist. Die Mesos-Slaves "verstecken" wir in einem privaten Subnet, da sie nicht zwangsläufig von
Extern ansprechbar sein müssen. Je nach Anforderungen kann man natürlich auch den Master in einem privaten Subnet 
platzieren oder die auch die Slaves in öffentlichen Subnets.  
 
Wir benötigen also folgende AWS Konfiguration:
 
 1. eine VPC zum Starten
 2. ein öffentliches und ein privates Subnet
 3. ein Internetgateway
 4. eine Elastic IP für ein NAT Gateway
 5. ein NAT Gateway, damit die EC2 Instanzen aus dem privaten Subnet mit "dem Internet" kommunizieren können [^0]
 6. eine EC2 Instanz mit Public IP im öffentlichen Subnet
 7. und zum "Spaß" zwei EC2 Instanzen im privaten Subnet
 8. diverse Konfigurationen wie ACLs, Security Groups, Routing Tables ...     
 
Im Free Tier kostet das Ganze - je nach Laufzeit und größe der EC2 Instanzen - lediglich ein paar Cent für das NAT Gateway 
und den Traffic über selbiges. Man kann, wenn man ein AMI mit Zookeeper und Mesos vorbereitet, auch auf das NAT Gateway 
verzichten oder lokal ein CLuster mit Vagrant oder Docker aufziehen, aber wie Eingangs
schon erwähnt, würde das den Traffic der LTE-Flat sprengen. Desweiteren kann man das ganze Setup über Cloudformation, 
Ansible, Chef ... natürlich automatisieren. Das überlasse ich jedoch dem geneigten Leser :)

Am Ende wollen wir folgendes Setup:

{% include image.html url="../../../../../../../../assets/aws_mesos.png" description="Setup der VPC" %} 

### 1. Erstellen der VPC

Als erstes erstellen wir unter **Services > VPC > Yout VPC's > Create VPC** eine VPC mit dem Namen `mesos_vpc` und dem CIDR Block `172.28.128.0/22`, 
der den Adressbereich `172.28.128.0`-`172.28.131.255` abdeckt:

{% include image.html url="../../../../../../../../assets/create_vpc.png" description="Setup der VPC" %}
 
Damit haben wir die Möglichkeit mehrere Subnetze innerhalb einer IP-Range zu erstellen, welche wir wiederum in verschiedenen 
Availability Zones platzieren können. Der Einfachheit halber bauen wir (erstmal nur) zwei Subnetze:
 
 * `mesos_subnet_a`: `172.28.128.0/24` (bspw. in der Avalability Zone EU-West-A)
 * `mesos_subnet_b`: `172.28.129.0/24` (bspw. in der Avalability Zone EU-West-B)

Wir benötigen für beide Subnetze unterschiedliche Routing Tables, dazu jedoch später mehr. 
 
### 2. Master Setup

Die Master Instanz wird unser Bastion Host für die Konfiguration der Slaves. Weiterhin werden wir Zookeeper, Mesos-Master, 
Marathon und einen Mesos-Slave Prozess starten:

{% include image.html url="../../../../../../../../assets/aws_mesos_master.png" description="" %}

Dafür erzeugen wir unter **Services > EC2 > Instances > Launch Instance** im Subnet `mesos_subnet_a` eine EC2 
Instanz z.B. mit einem Ubuntu 14.04 LTS Image. Ich verwende eine *t2.micro* Instanz, da diese im Free Tier enthalten. Da
diese Instanz auch unser Bastion Host für die Konfiguration unserer Slaves wird, müssen wir natürlich eine *Public IP* zuweisen
lassen oder eine *Elastic IP* verwenden per `ssh` zugreifen zu können. Da jedoch im Free Tier nur eine *Elastic IP* enthalten 
ist und wir diese für das NAT Gateway benötigen, verwende ich eben die *Public IP*. Ich weise darauf hin, dass *Public IP's* in 
einer produktiven Umgebung nur begrenzt Sinn machen, da diese beim Neustart der Instanz verloren gehen.

Um vom Master aus mit "dem Internet" kommunizieren zu können, müssen wir zunächst unter **Services > VPC > Internet Gateways > Create Internet Gateway** 
einen *Inernet Gateway* für das `mesos_subnet_a` erstellen. Dieser muss anschließend unter **Services > VPC > Routing Tables** 
in die *Routing Table* für dieses Subnet eingetragen werden:

| Destination      |           Target           | Status | Propageted |
|------------------|----------------------------|--------|------------|
| 172.28.128.0/22  |            local           | active |         No |
| 0.0.0.0/0        | igw-... (Internet Gateway) | active |         No |


<br>
Jetzt sollten wir uns per `ssh` mit unserem Keyfile einloggen können und `ping` ein Ergebnis zurückliefern:
  
~~~~~~~~
$ ssh -i <keyfile.pem> ubuntu@<public-ip>
$ ping -c 1 ubuntu.com
  PING ubuntu.com (91.189.94.40) 56(84) bytes of data.
  64 bytes from ovinnik.canonical.com (91.189.94.40): icmp_seq=1 ttl=48 time=12.6 ms

  --- ubuntu.com ping statistics ---
  1 packets transmitted, 1 received, 0% packet loss, time 0ms
  rtt min/avg/max/mdev = 12.633/12.633/12.633/0.000 ms
~~~~~~~~
{: .language-bash}

#### Installation von Zookeeper, Mesos & Marathon 

Für das Setup von Zookeeper, Mesos und Marathon folgen wir einfach dem Ubuntu-Guide von Mesosphere[^1].  
 
Zuerst installieren fügen wir Paket-Repositories von Mesosphere zu unserem Paketmanager hinzu:

~~~~~~~~
# Setup
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv E56151BF
# Add the repository
$ echo "deb http://repos.mesosphere.com/ubuntu trusty main" | sudo tee /etc/apt/sources.list.d/mesosphere.list
$ sudo apt-get -y update
~~~~~~~~
{: .language-bash}
 
Anschließend laden installieren wir Zookeeper, Mesos und Marathon:
 
~~~~~~~~
$ sudo apt-get -y install mesos marathon
~~~~~~~~
{: .language-bash}

Zookeeper wird als transitive Abhängigkeit automatisch installiert.
#### Konfiguration

Anschließend geht es an die Konfiguration der einzelnen Software-Komponenten. 

##### Zookeeper

Wir beginnen mit Zookeeper. Da wir zum Testen 
lediglich eine Master-Instanz aufsetzen wollen brauchen wir für Zookeeper keine Instanz-Id vergeben und lediglich eine 
Basiskonfiguration in `/etc/zookeeper/conf/zoo.cfg`:

~~~~~~~~
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181
~~~~~~~~
{: .language-bash}

Wie ihr vielleicht bemerkt habt, sind diese Einstellungen default. Somit haben wir nichts zu tun. Zookeeper bereit und 
kann gestartet werden:

~~~~~~~~
$ sudo service zookeeper restart
~~~~~~~~
{: .language-bash}

Man kann natürlich auch manuell OpenJDK 7 installieren, die letzte Version von Zookeper laden, konfigurieren und starten. 
Über das Mesosphere Repository bekommen wir jedoch das ganze Setup als Systemdienst geschenkt.

##### Mesos-Master

Nun ist Mesos an der Reihe. Als erstes tragen wir die lokale Zookeeper-Instanz über die VPC interne IP in `/etc/mesos/zk` ein:

~~~~~~~~
zk://172.28.128.xx:2181/mesos
~~~~~~~~

Anschließend konfigurieren wir das Quorum - also die Anzahl an Mesos-Master Nodes, die notwendig ist um einen Leader 
zu wählen - in der Datei ´/etc/mesos-master/quorum´:

~~~~~~~~
1
~~~~~~~~

Die Zahl beträgt optimalerweise den aufgerundeten Wert der Division der Anzahl an Master-Nodes durch zwei. Also bei drei Master 
Nodes ist das Quorum 2, bei fünf Nodes 3, bei sieben Nodes 4 usw.
    
Zuletzt müssen wir die *Public IP* der Instanz als Hostname in `/etc/mesos-master/hostname` eintragen und anschließend den Mesos-Master starten:

~~~~~~~~
$ curl http://169.254.169.254/latest/meta-data/public-ipv4/ | sudo tee /etc/mesos-master/hostname
$ sudo service mesos-master restart
~~~~~~~~
{: .language-bash}

Nach kurzer Wartezeit sollte das Webinterface von Mesos unter *http://\<public-ip\>:5050* erreichbar sein:

{% include image.html url="../../../../../../../../assets/mesos_webui.png" description="" %}

##### Marathon

Für Marathon müssen wir lediglich den Hostname in `/etc/marathon/conf/hostname` eintragen und starten:

~~~~~~~~
$ curl http://169.254.169.254/latest/meta-data/public-ipv4/ | sudo tee /etc/marathon/conf/hostname
$ sudo service marathon restart
~~~~~~~~
{: .language-bash}

Anschließend sollten wir im Mesos-Webinterface unter **Frameworks** einen Eintrag für Marathon finden und das Marathon-Webinterface 
unter *http://\<public-ip\>:8080/* aufrufen können: 

{% include image.html url="../../../../../../../../assets/marathon_webui.png" description="" %}

Leider haben wir bis jetzt noch keinen Mesos-Slave auf dem wir Tasks schedulen könnten. Also werden wir diese jetzt aufsetzen.
Mit der Mesos-Installation aus dem Mesosphere Repository wird auch ein Autostart-Service für einen Mesos-Slave eingerichtet. Den kann 
man auf dem Master entweder deaktivieren oder man lässt auf dem Master-Node einen Mesos-Slave mitlaufen, was in kleineren 
Clustern durchaus valide ist [^2]. 
 
### 3. Slave Setup
 
Wir haben nun zwei Möglichkeiten: Entweder wir setzen eine Instanz von Hand auf und installieren Zookeeper und Mesos wie für den Master beschrieben,
oder wir ziehen uns von unserem Master ein *AMI* und verwenden dieses um einen Slave aufzusetzen und deinstallieren/deaktivieren anschließend Marathon
und Zookeeper, das diese nur auf dem Master gebraucht werden.

Wir werden an dieser Stelle eine neue *EC2 Instanz* mit Ubuntu 14.04 LTS verwenden. Dazu erzeugen wir unter **Services > EC2 > Instances > Launch Instance**
wieder eine neue Instanz innerhalb des privateb Subnet `mesos_subnet_b` **ohne** *Public IP*. Anschließend legen wir unter 
**Services > VPC > NAT Gateways > Create NAT Gateway** einen neuen Gateway **innerhalb** des Subnet `mesos_subnet_a` an. Nun müssen wir
unter **Services > VPC > Routing Tables > Create Route Table** eine zweite *Route Table* für unsere *VPC* anlegen. Diese Table muss
so konfiguriert werden, dass der ausgehende Netzwerk-Traffic über das *NAT Gateway* geroutet wird:

| Destination      |      Target           | Status | Propageted |
|------------------|-----------------------|--------|------------|
| 172.28.128.0/22  |       local           | active |         No |
| 0.0.0.0/0        | nat-... (NAT Gateway) | active |         No |

Diese *Route Table* muss dem privaten Subnet `mesos_subnet_b` zugewiesen werden. Andernfalls bekommen wir aus dem privaten
Subnet keine Verbindung nach außen. Wer nicht weiß warum das so ist, der kann unter [^3] eine erleuchtene Antwort finden.
Wenn jetzt alle *Security Groups* und *ACLs* korrekt konfiguriert sind, sollten wir uns über den Master per `ssh` auf der
neuen Instanz einloggen können (das Keyfile muss man entsprechend auf dem Master ablegen) und ein `ping` sollte uns ein
Ergebnis zurückliefern.

#### Installation

Nun geht es an die Installation von Mesos und Docker. 

##### Mesos 

Wir starten mit der Installation von Mesos. Dazu richten wir - wie auf dem Master - das Mesosphere Repository für den Paketmanager 
ein und installieren Mesos erneut via `apt-get`.

Dann deaktivieren wir den Zookeeper und den Mesos-Master Autostart:

~~~~~~~~
# disable Zookeeper
$ sudo service zookeeper stop
$ echo "manual" | sudo tee /etc/init/zookeeper.override

# disable Mesos Master
$ sudo service mesos-master stop
$ echo "manual" | sudo tee /etc/init/mesos-master.override
~~~~~~~~
{: .language-bash}

##### Docker

Wenn wir mit Marathon Docker Container schedulen wollen müssen wir auf jedem Slave, der Docker Container unterstützen soll,
Docker aufsetzen. Dazu halten wir uns an das Tutorial von Docker[^4]. Wir starten damit das Repository für den Paketmanager
aufzusetzen:

~~~~~~~~
# make https repos available
$ apt-get install apt-transport-https ca-certificates

# add key
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

# add repo 
$ echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list

# update
$ apt-get update
~~~~~~~~
{: .language-bash}

Anschließend installieren wir Docker:

~~~~~~~~
# install docker
$ sudo apt-get install docker-engine
~~~~~~~~
{: .language-bash}

#### Konfiguration

Nachdem wir nun alle notwendigen Softwarepakete installiert haben, machen wir uns an die Konfiguration. Zuerst müssen wir 
die interne IP des Master Nodes in `/etc/mesos/zk` eintragen:

~~~~~~~~
$ echo 'zk://172.28.128.xx:2181/mesos' | sudo tee /etc/mesos/zk
~~~~~~~~
{: .language-bash}

Anschließend müssen wir Docker als Container-Eingine in `/etc/mesos-slave/containerizers` eintragen:

~~~~~~~~
$ echo 'docker,mesos' | sudo tee /etc/mesos-slave/containerizers
~~~~~~~~
{: .language-bash}

Und zuletzt den Mesos-Slave-Prozess neu starten:

~~~~~~~~
$ sudo service mesos-slave restart
~~~~~~~~
{: .language-bash}

Ein Blick auf den Punkt **Slaves** im Mesos Webinterface verrät uns nun, ob sich der Slave beim Master angemeldet
hat. Wenn dies der Fall ist, können wir vom Slave ein *AMI* ziehen und damit unser Cluster beliebig skalieren.

### 4. Starten eines Docker-Containers

Um nun einen Docker Container zu starten kann man entweder die REST API oder das Webinterface von Marathon verwenden.
Wir verwenden an dieser Stelle die REST API indem wir die folgende Konfiguration mit einem beliebigen REST Client 
per `POST` an die URL `http://<public-master-ip>/v2/apps` senden:          
 
~~~~~~~~
{
    "id": "jenkins", 
    "container": {
      "docker": {
        "image": "mongodb",
        "network": "BRIDGE",
        "portMappings": [
          {"containerPort": 27017, "servicePort": 27017},
        ]
      }
    },
    "cpus": 0.5,
    "mem": 256.0,
    "instances": 1
}
~~~~~~~~
{: .language-javascript}

Der Container läuft jetzt natürlich auf einem beliebingen Slave, welche wiederum keine öffentliche IP haben. Daher ist der 
Zugriff auf Datenbank nicht ohne weiteres möglich. Das ist am Ende Sache der Orchestration und Service Discovery. Wir können
jedoch verifizieren dass unser Container gestartet wurde indem wir die Slaves besuchen und mit `docker ps` nachsehen
wo der Container gestartet wurde. 

Alternativ zu Marathon gibt es noch weitere Tools und Frameworks die von Mesos' Resourcenmanagement profitieren können, 
wie zum Beispiel Spark, Hadoop, Storm, Cassandra, Jenkins uvm.[^5] Und sollte es kein passendes Framework geben, so steht
eine API zur Entwicklung eigener Frameworks zur Verfügung[^6].
    

### High Availability

Um das Cluster hochverfügbar zu machen reichen wenige Anpassungen:

- mehrere Master Nodes in verschiedenen *Availability Zones*
- verteilen der Slaves über mehrere *Availability Zones* hinweg
- das AWS NAT Gateways selbst ist hochverfügbar[^7]

{% include image.html url="../../../../../../../../assets/aws_mesos_ha.png" description="" %}

So sind wir auf der sicheren Seite, wenn einzelne Master und Slave Instanzen oder sogar komplette *Availability Zones* wegbrechen.

Was wir nun haben ist eine gute Basis für ein Cluster in dem dynamisch skalierbare Anwendungen laufen können. Damit diese 
Anwendungen funktionieren sind natürlich aber weiterhin die üblichen Mechanismen wie Orchestration, Service Discovery, Routing etc. notwendig.

## Links und Quellen 

[^0]: [http://docs.aws.amazon.com/de_de/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html](http://docs.aws.amazon.com/de_de/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html)
[^1]: [https://open.mesosphere.com/getting-started/install/](https://open.mesosphere.com/getting-started/install/)
[^2]: [http://stackoverflow.com/questions/26597521/can-mesos-master-and-slave-nodes-be-deployed-on-the-same-machines](http://stackoverflow.com/questions/26597521/can-mesos-master-and-slave-nodes-be-deployed-on-the-same-machines)
[^3]: [http://stackoverflow.com/questions/22188444/why-do-we-need-private-subnet-in-vpc](http://stackoverflow.com/questions/22188444/why-do-we-need-private-subnet-in-vpc)
[^4]: [https://docs.docker.com/engine/installation/linux/ubuntulinux/](https://docs.docker.com/engine/installation/linux/ubuntulinux/)
[^5]: [https://open.mesosphere.com/frameworks/](https://open.mesosphere.com/frameworks/)
[^6]: [http://mesos.apache.org/documentation/latest/app-framework-development-guide/](http://mesos.apache.org/documentation/latest/app-framework-development-guide/)
[^7]: [https://aws.amazon.com/de/blogs/aws/new-managed-nat-network-address-translation-gateway-for-aws/](https://aws.amazon.com/de/blogs/aws/new-managed-nat-network-address-translation-gateway-for-aws/)

[Zookeeper Admin Guide](https://zookeeper.apache.org/doc/r3.4.3/zookeeperAdmin.html)

[Mesos Documentation](http://mesos.apache.org/documentation/latest/)

[AWS User Guide](http://docs.aws.amazon.com/de_de/AWSEC2/latest/UserGuide/concepts.html)
