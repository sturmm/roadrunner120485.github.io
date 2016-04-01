---
layout: post
title:  "Allgemeines Cluster-Setup für skalierbare Softwarearchitekturen"
date:   2016-03-13 00:00:00 +0100
categories: cloud cluster docker
---

Dank Microservices, Container Ökosystemen und Cloud Providern werden Architekturen für skalierbare Systeme immer populärer.
So unterschiedlich die internen Architekturen der Applikationen auch sind, so ähneln sich die allgemeinen Probleme und die 
Grundstruktur solcher Systeme doch stark. Im Grunde handelt es sich immer um verteilte oder "serviceorientierte" Anwendugen. 

Um solche Systeme zu beherrschen, erfolgreich zu betreiben und ihre Vorteile wie Skalierbarkeit optimal nutzen zu können 
bieten Cloud Provider wie AWS jede Menge Werkzeuge wie z.B. Autoscaling Groups (Skalierung) , den ElasticLoadBalancer (Load Balancing), 
SQS (Messaging), CloudFormation (Orchestration), CloudWatch (Logging & Monitoring) um nur ein paar zu nennen. Die meisten dieser 
Werkzeuge findet man in ählicher Form in jeder Umgebung für verteilte, skalierbare Systeme wieder. Grund genug einmal einen 
Blick auf die allgemeine Architektur zu werfen:  
              
{% include image.html url="../../../../../../assets/General Cluster Architecture.png" description="Setup der VPC" %}

## Logging und Log Management

Eines der wesentlichen und oft vernachlässigten Probleme beim Betrieb von verteilten Anwendungen ist das Logging. Wo man bei
einer monolithischen Architektur eine Hand voll Logfiles hat, so hat man in einer verteilten Architektur für jede Appikation 
eine Hand voll Logfiles. 

Eine Benutzerinteraktion kann Logs über mehrere Prozesse und Rechner-Knoten hinweg generieren. Sich Da im  Fehlerfall einen Überblick zu 
verschaffenund um das Problem schnell zu finden und effizient zu beheben, gelingt nur mit orgentlichen Tools und einem ordentlichen 
Logging Konzept.

Zum einen sollten alle Logs an zentraller Stelle einsehbar sein. Dazu eignen sich die bekannten Log Management Tools wie **ELK** (ElasticSearch, Logstash, Kibana), 
**graylog** oder **Splunk**. 

Zum anderen müssen die Logs über Prozesssgrenzen hinweg nachvollziehbar sein. Dazu sollte die erste Prozess,
die einen Request entgegen nimmt eine, eine *TraceId* generieren. Diese wird an die weiteren involvierten Prozesse weitergereicht 
und ist Bestandteil jeder Logausgabe. In **Log4j** kann man dazu beispielsweise den NDC oder den MDC verwenden. Die *TradeId* muss wiederum 
vom Log Managment Tool geparsed und indexiert werden, um schnell die Logs aller Prozesse zu einem Request auffinden zu können. 
Zusätzich kann man so evetnuell verlorene Einsichten darüber wieder gewinnen, welche Prozesse sich in welcher Reihenfolge 
gegenseitig aufrufen.

Am besten setzt man ein solches Konzept vom Start weg um, da man zu einem späteren Zeitpunkt viele Baustellen aufmachen muss
um es systemweit zu etablieren.
 
TODO TraceId-Screenshot    


## Monitoring

Ich will an dieser Stelle garnicht zu sehr auf das Thema Monitoring eingehen. Wie bei jeder produktiven Anwendung ist Monitoring ein muss.
Es wird, wie alles andere auch, durch die Dynamik und Verteilung des Systems komplexer. Schduling und Monitoring müssen
Hand in Hand arbeiten. Zum einen brauchen wir Kennzahlen wie Speicher- oder CPU-Auslastung um Teile der Anwendung gezielt skalieren zu können.
Zum anderen beeinflussen Skalierungs-Ereignisse auch das Monitoring. Beim Up-Scaling müssen neue Services Prozesse überwacht werden. 
Beim Down-Scaling müssen die entsprechenden Prozesse ausgetragen werden, um nicht fälschlicherweise über abgestürtzte Prozesse zu benachritigen. 

Im besten Fall kann sich der Scheduler darum kümmern gestorbene Prozesse wieder neu zu starten oder im Falle wegbrechender Server
die darauf laufenden Prozesse im übrigen Cluster neu zu verteilen. An dieser Stelle ist man jedoch stark von den verwendeten 
Cloud-Dienstleistern oder Frameworks abhänging. Daher muss man auch genau schauen mit welchen Frameworks man seine Umgebung aufsetzt.

Es gibt eine Reihe von Tools die für das Monitoring verwendet werden können. Dazu gehören biespielsweise Graphite/Grafana, Icinga, Nagios und AppDynamics 
um nur ein paar gängige Beispiele zu nennen.
 
## Cluster-Management

An dieser Stelle geht es im Grunde darum einen losen Haufen von Rechnern-Knoten miteinander bekannt zu machen. Ziel ist es 
die zu Verfügung stehende Rechenleistung optimal auszunutzen und dadurch Kosten zu senken. 
Je nachdem für welchen Stack man sich entscheidet, gibt es wiederum unterschiedliche Tools mit unterschiedlichen Features.
Wenn wir auf dieser Ebene Mesos verwenden, bekommen wir zusätzlich zum Cluster-Verbund auch noch einen Resourcen-Manager dazu, 
der ich schon im Betrieb von mehreren tausen Rechner-Knoten bewiesen hat.
Etwas leichtgewichtiger sind hingegen etcd, consul oder Zookeeper, die wiederum mit einem unterschiedlichen Set an Features aufwarten.
  
## Scheduling/Orchestration  

Um Anwendungen und deren Abhängigkeiten untereinander im Cluster zu verwalten wird ein Scheduler benötigt. Dem Scheduler sind die 
zu Verfügung stehenden Rechner-Knoten und - im Optimalfall - die Resourcen bekannt um, gezielt Prozesse im Cluster verteilen zu können. 
Dazu setzt der Scheduler auf dem Cluster-Manager auf. 
Auch hier gibt es speziell im Docker Ökosystem einige Vertreter. Dazu gehören Maraton (für Mesos), Docker Swarm (mit Docker Compose), 
Kubernetes oder der neuere Stern am Himmel: nomad von Hashicorp. Alle diese Tools ermöglichen es Docker Container in einem Cluster
zu verwalten. 
Im Gegensatz zur Verwaltung einzelner Prozesse meint Orchestierung die Verwaltung einer Gruppe von Prozessen. So gehört zu einer
Anwendung oft eine Datenbank, verschiedene Microservices und ein oder mehrere Frontends, welche alle zusammen das eigentliche System 
bilden. Die genannten Scheduler beherrschen eigentlich alle auch Orchestration. Die Grenzen zwischen Scheduling und Orchestration 
verschwimmen jedoch oft. Als reinen Scheduler könnte man am ehesten noch Mesos sehen.
   
## Applikation

Über Microservices wurde ja schon einiges geschrieben, daher halte ich mich hier zurück. Eines der Ziele einer Cloud-Architektur 
ist aber natürlich Skalierbarkeit. Die Einzelanwendungen sollen so gestrickt werden, dass gezieltes Skalieren relavanter Teile möglich ist. 
Prinzipiell ist aber, wie im gesamten Cluster-Design auch, Augenmaß gefragt. Wer ohne Erfahrung sofort mit der möglichst größten Lösung 
starten will, wird enventuell scheitern. Die vielen kleinen Bausteine der Gesamtarchitektur kosten Zeit bei der Einarbeitung. Daher ist es 
Sinnvoll zwar einen Plan für das große Ganze zu haben, aber vielleicht mit wenigen Services oder ganz und gar mit einem Monolithen zu 
beginnen, um schnell Ergebnisse erzielen zu können. Es gibt jedoch Dinge, die man von Anfang an auch in der Implementierung berücksitigen 
sollte. 

Um Resourcen zu schonen empfiehlt es sich non-blocking zu arbeiten. Das funktioniert nicht nur mit neuen, hochmodernen bleeding Edge 
Frameworks sondern auch mit weit verbreiteten Frameworks wie Beispielsweise Spring. 

Für die Skalierbarkeit sollten sich Prozesse beim Start Pull-basiert konfigurieren. Das heißt, dass Konfigurationen möglichst nicht
in .ini-, .property- oder ".wie-auch-immer"-Dateien abgelegt werden, sondern vom Prozess selbst von zentraler Stelle geladen. Wir wissen
schließlich nicht auf welchem Rechner-Knoten der Prozess laufen wird. Desweiteren ist es möglich innerhalb eines Clusters sowohl Test-
als auch Produktivsysteme zu betreiben. Dazu eignen sich Zookeeper, etcd oder Consul hervorragend. URLs von benötigten Services müssen 
über Service-Discovery-Mechanismen gefunden werden. Ein absolutes Anti-Pattern sind har codierte URLs oder andere Konfigurationen.



  
  
    
  

- Augenmaß
- "langsam" anfangen
- Non-Blocking um Resourcen optimal zu nutzen
-      
  
- erreichen loser kopplung der systeme -> keine URLs im Code & Konfigurationen nicht in Dateien...
- lose kopplung -> wie zusammen arbeiten? Pact, Service Discovery
- 

## Links
http://blog.takipi.com/the-7-log-management-tools-you-need-to-know/

https://www.nagios.org
https://www.icinga.org
http://graphite.wikidot.com
http://grafana.org
http://appdynamics.com/

https://www.consul.io/
http://mesos.apache.org
https://coreos.com/etcd/
http://zookeeper.apache.org/

https://docs.docker.com/swarm/
https://www.nomadproject.io/
http://kubernetes.io/
https://mesosphere.github.io/marathon/

https://coreos.com/


