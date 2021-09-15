# Papers on Network Resource Allocation

This is a paper list about Resource Allocation in  [Network Functions Virtualization](https://en.wikipedia.org/wiki/Network_function_virtualization) (NFV) and [Software-Defined Networking](https://en.wikipedia.org/wiki/Software-defined_networking) (SDN), including

- Comprehensive **Survey** and **Analysis**
- **Slicing**: Network Slicing
- **VNFC**: Virtual Network Functions Chaining (also known as Service Function Chains Orchestration)
- **VNFP**: Virtual Network Functions Placement (also known as Service Function Chain Deployment)
- **VNFS**: Virtual Network Functions Scheduling (including Scaling, Reconfiguration and Migration)
- **Routing**: Network Traffic Measurement and Management
- **Multi-domain** (also known as cross-domain, multi-region or other resemble name)

We mainly collect papers from high-quality journals and conferences, and classify them according to method categories. Particularly, you can find more details of  papers in the **Machine Learning-based** section, which represents a promising technique to efficiently solve network resource allocation problems.

### Search by Keywords

You can search the relevant papers by following keywords:

- **Direction**: `VNFC`, `VNFP`, `VNFS`, `Routing`, `Multi-domain`, `Joint`
- **Publication**: `JSAC`, `TON`, `INFOCOM`, `TPDS`, `TC`, `TMC`, ...
- **PUB-rank**: `CCF-A`, `CCF-B`, `JCR-Q1`, ...
- **Scenario**: `Dsitributed`,  `IoT`, `Edge`, `Mobile`, `Optical Network`, ...
- **Awareness**: `Latency`, `Congestion`, `Privacy`, `Energy`, `Parallelization`, `Reliability`
- **RL-ALGO**: `DQN`, `DDPG`, `A3C`, `PPO`, ...
- **NN-type**: `CNN`, `RNN`, `GNN`, ...

### Repository & Website

- [Repository](https://github.com/GeminiLight/nfv-papers):  More timely updates
- [Website](https://geminilight.github.io/nfv-papers/): Better reading experience

## [Content](#content)

- <a href="#1-survey-and-analysis">1. Survey and Analysis</a>
- <a href="#2-mathematical-based-methods">2. Mathematical-based Methods</a>
- <a href="#3-heuristic-based-methods">3. Heuristic-based Methods</a>
  - <a href="#31-slicing">3.1 Slicing</a>
  - <a href="#32-vnfc">3.2 VNFC</a>
  - <a href="#33-vnfp">3.3 VNFP</a>
  - <a href="#34-vnfs">3.4 VNFS</a>
  - <a href="#35-routing">3.5 Routing</a>
- <a href="#4-machine-learning-based-methods">4. Machine Learning-based Methods</a> :star:
  - <a href="#41-slicing">4.1 Slicing</a>
  - <a href="#42-vnfc">4.2 VNFC</a>
  - <a href="#43-vnfp">4.3 VNFP</a>
  - <a href="#44-vnfs">4.4 VNFS</a>
  - <a href="#45-routing">4.5 Routing</a>
- <a href="#5-other-and-unassorted">5. Other & Unassorted</a>

> Note: :star: means it may be a promising research direction, which is considered subjectively.


## [1. Survey and Analysis](#content)

1. **Recent Advances of Resource Allocation in Network Function Virtualization**

   - `Publication`: TPDS 2021 (**CCF-A**)
   - `Authors`: Song Yang, Fan Li, Stojan Trajanovski, Ramin Yahyapour, Xiaoming Fu
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9169857)

1. **Graph-based Deep Learning for Communication Networks: A Survey**

   - `Publication`: arXiv 2021
   - `Authors`: Weiwei Jiang
   - `Link`: [arXiv](https://arxiv.org/abs/2106.02533)

1. **On the Hardness and Inapproximability of Virtual Network Embeddings**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Matthias Rost and Stefan Schmid
   - `Link`: [paper](https://www.univie.ac.at/ct/stefan/ton20hard.pdf)

1. **SDN/NFV-Empowered Future IoV With Enhanced Communication, Computing, and Caching**

   - `Publication`: Proc. IEEE 2020 (**CCF-A**)
   - `Authors`: Weihua Zhuang; Qiang Ye; Feng Lyu; Nan Cheng; Ju Ren
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8907851)

1. **Survey of Performance Acceleration Techniques for Network Function Virtualization**

   - `Publication`: Proc. IEEE 2019 (**CCF-A**)
   - `Authors`: Leonardo Linguaglossa; Stanislav Lange; Salvatore Pontarelli; Gábor Rétvári; Dario Rossi; Thomas Zinner; Roberto Bifulco; Michael; Jarschel; Giuseppe Bianchi
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8666751)

1. **Will Serverless Computing Revolutionize NFV?**

   - `Publication`: Proc. IEEE 2019 (**CCF-A**)
   - `Authors`: Paarijaat Aditya; Istemi Ekin Akkus; Andre Beck; Ruichuan Chen; Volker Hilt; Ivica Rimac; Klaus Satzke; Manuel Stein
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8653379)

1. **5G network slicing using SDN and NFV: A survey of taxonomy, architectures and future challenges**

   - `Publication`: CN 2020 (**CCF-B**)
   - `Authors`: Alcardo AlexBarakabitze, ArslanAhmad, Rashid Mijumb, Andrew Hinesd
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1389128619304773)

1. **Routing via Functions in Virtual Networks: The Curse of Choices**

   - `Publication`: TON 2019 (**CCF-A**)
   - `Authors`: Thi-Minh Nguyen; André Girard; Catherine Rosenberg; Serge Fdida
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8705279)

1. **A Survey on the Placement of Virtual Resources and Virtual Network Functions**

   - `Publication`: IEEE Communications Surveys & Tutorials 2019 (**JCR-Q1**)
   - `Authors`: Abdelquoddouss Laghrissi and Tarik Taleb
   - `Link`: [paper](http://mosaic-lab.org/uploads/papers/078b601e-3e01-4a42-8a35-b98e2d113943.pdf)

1. **Resource Allocation in NFV: A Comprehensive Survey**

   - `Publication`: TNSM 2019 (**JCR-Q1**)
   - `Authors`: Juliver Gil Herrera, Juan Felipe Botero
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7534741)

1. **A Comprehensive Survey of Network Function Virtualization**

   - `Publication`: CN 2018 (**CCF-B**)
   - `Authors`: Bo Yi, Xingwei Wang, Keqin Li, Sajal k. Das , Min Huang
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128618300306)

1. **Virtual Network Embedding: a Survey**

   - `Publication`: IEEE Communications Surveys & Tutorials 2013 (**JCR-Q1**)
   - `Authors`: Andreas Fischer; Juan Felipe Botero; Michael Till Beck; Hermann de Meer; Xavier Hesselbach
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/6463372)

## [2. Mathematical-based Methods](#content)

> Solving these problems with exact mathematical methods usually needs expensive computing resources and running time, which limits its applications in most realistic scenarios.

## [3. Heuristic-based Methods](#content)

> Here are many heuristic-based and meta-heuristic-based methods, only part of which recently published are displayed directly. You can obtain more papers by clicking `more` button.

### [3.1 Slicing](#content)

1. **A Coverage-Aware Resource Provisioning Method for Network Slicing**

    - `Publication`: TON 2020 (**CCF-A**)
    - `Authors`: Quang-Trung Luu; Sylvaine Kerboeuf; Alexandre Mouradian; Michel Kieffer
    - `Keywords`: Slicing
    - `Objective`: /
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8668438)

1. **End-to-end network slicing for future wireless in multi-region cloud platforms**

    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Simona Marinova , Thomas Lin, Hadi Bannazadeh, Alberto Leon-Garcia
    - `Keywords`: Slicing, Multi-domain, E2E (End-to-end), network slicing
    - `Objective`: /
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128619316081)

1. **Optimization Model for Cross-Domain Network Slices in 5G Networks**

    - `Publication`: TMC 2019 (**CCF-A**)
    - `Authors`: Rami Akrem Addad; Miloud Bagaa; Tarik Taleb; Diego Leonel Cadette Dutra; Hannu Flinck
    - `Keywords`: Slicing, Multi-domain
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8668438)

1. **Multi-Tenant Radio Access Network Slicing: Statistical Multiplexing of Spatial Loads**

    - `Publication`: TON 2017 (**CCF-A**)
    - `Authors`: Pablo Caballero; Albert Banchs; Gustavo de Veciana; Xavier Costa-Pérez
    - `Keywords`: Slicing
    - `Objective`: Cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7982693)

### [3.2 VNFC](#content)

1. **Leveraging Network Functions Virtualization Orchestrators to Achieve Software-Defined Access Control in the Clouds**

    - `Publication`: TDSC 2021 (**CCF-A**)
    - `Authors`: Montida Pattaranantakul; Ruan He; Zonghua Zhang; Ahmed Meddahi; Ping Wang
    - `Keywords`: VNFC
    - `Objective`: Throughput +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8588356)

1. **Combined Stateful Classification and Session Splicing for High-Speed NFV Service Chaining**

    - `Publication`: TON 2021 (**CCF-A**)
    - `Authors`: Tom Barbette; Cyril Soldani; Laurent Mathy
    - `Keywords`: VNFC, High-Speed
    - `Objective`: Speed +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9503101)

1. **Toward Optimal Partial Parallelization for Service Function Chaining**

    - `Publication`: TON 2021 (**CCF-A**)
    - `Authors`: I-Chieh Lin; Yu-Hsuan Yeh; Kate Ching-Ju Lin
    - `Keywords`: VNFC, Parallelization
    - `Objective`: Latency -, Parallelization +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9445660)

1. **A Scalable Stateful Approach for Virtual Security Functions Orchestration**

    - `Publication`: TPDS 2021 (**CCF-A**)
    - `Authors`: Niloofar Moradi; Alireza Shameli-Sendi; Alireza Khajouei
    - `Keywords`: VNFC, Scalable
    - `Objective`: Cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9445660)

1. **Toward a Real Deployment of Network Services Orchestration and Configuration Convergence Framework for 5G Network Slices**

    - `Publication`: IEEE Network 2021 (**JCR-1**)
    - `Authors`: Ibrahim Afolabi; Miloud Bagaa; Walid Boumezer; Tarik Taleb
    - `Keywords`: VNFC, VNFP, Joint, Network Slice, Distributed
    - `Objective`: Framework
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9293090/)

1. **Slicing-based Reliable Resource Orchestration for Secure Software Defined Edge-Cloud Computing Systems**

    - `Publication`: IoTJ 2021 (**JCR-1**)
    - `Authors`: Ahmadreza Montazerolghaem
    - `Keywords`: VNFC, IoT, Network Slice
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9475487/)

<details>
<summary> more </summary>

1. **Log Management in NFV Service Orchestration**

    - `Publication`: SECON 2021 (**CCF-B**)
    - `Authors`: Engin Zeydan; Jorge Baranda; Josep Mangues-Bafalluy; Ricardo Martínez; Luca Vettori
    - `Keywords`: VNFC, Log
    - `Objective`: Log
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9491606)

1. **On Cross-domain Service Function Chain orchestration: An architectural framework**

    - `Publication`: CN 2021 (**CCF-B**)
    - `Authors`: Nassima Toumi, Olivier Bernier, Djamal-Eddine Meddour, Adlen Ksentini
    - `Keywords`: VNFC, Multi-domain
    - `Objective`: Framework
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128621000013)

1. **Towards Latency Optimization in Hybrid Service Function Chain Composition and Embedding**

   - `Publication`: INFOCOM 2020 (**CCF-A**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keywords`: VNFC, VNFP, HSFCE (Hybrid SFC composition and Embedding), Latency-aware, Betweenness Centrality
   - `Objective`: Latency
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9155529)

1. **Multiservice-Based Network Slicing Orchestration With Impatient Tenants**

   - `Publication`: TMC 2020 (**CCF-A**)
   - `Authors`: Ibrahim Afolabi; Jonathan Prados-Garzon; Miloud Bagaa; Tarik Taleb; Pablo Ameigeiras
   - `Keywords`: VNFC, Dynamic 
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8772218)

1. **Multiservice-Based Network Slicing Orchestration With Impatient Tenants**

   - `Publication`: TWC 2020 (**CCF-B**)
   - `Authors`: PDF Bin Han; Vincenzo Sciancalepore; Xavier Costa-Pérez; Di Feng; Hans D. Schotten
   - `Keywords`: VNFC
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9082203)

1. **pSMART: A lightweight, privacy-aware service function chain orchestration in multi-domain NFV/SDN**
   
    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Kalpana D. Joshi , Kotaro Kataoka
    - `Keywords`: VNFC, Multi-domain, Privacy
    - `Objective`: Utilize less sensitive information, to reduce privacy and security risks
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128619311181)

1. **A Scalable Stateful Approach for Virtual Security Functions Orchestration**

    - `Publication`: TPDS 2019 (**CCF-A**)
    - `Authors`: Lin Cui; Fung Po Tso; Song Guo; Weijia Jia; Kaimin Wei; Wei Zhao
    - `Keywords`: VNFC, Heterogeneous
    - `Objective`: Cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8470961)

1. **VirtualEdge: Multi-Domain Resource Orchestration and Virtualization in Cellular Edge Computing**

    - `Publication`: ICDCS 2019 (**CCF-B**)
    - `Authors`: Qiang Liu; Tao Han
    - `Keywords`: VNFC, VNFP, Multi-Domain
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8884864)

</details>

### [3.3 VNFP](#content)

1. **Latency-Sensitive Edge/Cloud Serverless Dynamic Deployment Over Telemetry-Based Packet-Optical Network**

    - `Publication`: JSAC 2021 (**CCF-A**)
    - `Authors`: István Pelle; Francesco Paolucci; Balázs Sonkoly; Filippo Cugini
    - `Keywords`: VNFP, Latency, Optical Network
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8962126)

1. **Prune and Plant: Efficient Placement and Parallelism of Virtual Network Functions**

    - `Publication`: TC 2021 (**CCF-A**)
    - `Authors`: Wei Bao; Dong Yuan; Bing Bing Zhou; Albert Y. Zomaya
    - `Keywords`: VNFP, Parallelization, Prune and Plant
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8962126)

1. **Online Service Function Chain Placement for Cost-effectiveness and Network Congestion Control**

    - `Publication`: TC 2021 (**CCF-A**)
    - `Authors`: Xiaojun Shang; Zhenhua Liu; Yuanyuan Yang
    - `Keywords`: VNFP, Routing, Online candidate path selection (OCPS)
    - `Objective`: Latency -, Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9248649)

1. **Prioritized Deployment of Dynamic Service Function Chains**

    - `Publication`: TC 2021 (**CCF-A**)
    - `Authors`: Xiaojun Shang; Zhenhua Liu; Yuanyuan Yang
    - `Keywords`: VNFP, Prioritized
    - `Objective`: Latency -, Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9363457)

1. **Mobility-Aware and Delay-Sensitive Service Provisioning in Mobile Edge-Cloud Networks**

    - `Publication`: TC ( Early Access ) (**CCF-A**)
    - `Authors`: Yu Ma; Weifa Liang; Jing Li; Xiaohua Jia; Song Guo
    - `Keywords`: VNFP, Mobility, Latency
    - `Objective`: Latency -, Mobility +, Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9363457)
    
1. **Request Reliability Augmentation with Service Function Chain Requirements in Mobile Edge Computing**

    - `Publication`: TMC 2021 (**CCF-A**)
    - `Authors`: Weifa Liang; Yu Ma; Wenzheng Xu; Zichuan Xu; Xiaohua Jia; Wanlei Zhou
    - `Keywords`: VNFP, Reliability
    - `Objective`: Reliability +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9435077/)

1. **Delay-Aware Virtual Network Function Placement and Routing in Edge Clouds**

    - `Publication`: TMC 2021 (**CCF-A**)
    - `Authors`: Song Yang; Fan Li; Stojan Trajanovski; Xu Chen; Yu Wang; Xiaoming Fu
    - `Keywords`: VNFP, Latency
    - `Objective`: Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8844781/)

1. **Online Adaptive Interference-Aware VNF Deployment and Migration for 5G Network Slice**
    - `Publication`: TON 2021 (**CCF-A**)
    - `Authors`: Qixia Zhang; Fangming Liu; Chaobing Zeng
    - `Keywords`: VNFP, VNFS, Joint
    - `Objective`: Acceptance cost +, Migration cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9440734/)

1. **Service Placement and Request Scheduling for Data-Intensive Applications in Edge Clouds**

    - `Publication`: TON 2021 (**CCF-A**)
    - `Authors`: Vajiheh Farhadi; Fidan Mehmeti; Ting He; Thomas F. La Porta; Hana Khamfroush; Shiqiang Wang
    - `Keywords`: VNFP, VNFS, Joint
    - `Objective`: Acceptance cost +, Migration cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9345766/)

1. **Efficient Virtual Network Embedding of Cloud-Based Data Center Networks into Optical Networks**

    - `Publication`: TPDS 2021 (**CCF-A**)
    - `Authors`: Weibei Fan; Fu Xiao; Xiaobai Chen; Lei Cui; Shui Yu
    - `Keywords`: VNFP, Optical Networks
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9415134)

1. **Joint SFC Deployment and Resource Management in Heterogeneous Edge for Latency Minimization**

    - `Publication`: TPDS 2021 (**CCF-A**)
    - `Authors`: Yu Liu; Xiaojun Shang; Yuanyuan Yang
    - `Keywords`: VNFP, VNFS, Joint, Heterogeneous, Edge, Latency
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9363567)

1. **Joint Virtual Network Topology Design and Embedding for Cybertwin-Enabled 6G Core Networks**

    - `Publication`: IoTJ 2021 (**JCR-1**)
    - `Authors`: Junling Li; Weisen Shi; Qiang Ye; Shan Zhang; Weihua Zhuang; Xuemin Shen
    - `Keywords`: VNFP, Joint, Latency
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9415134/)

1. **Energy-Aware Service Function Chain Embedding in Edge–Cloud Environments for IoT Applications**

    - `Publication`: IoTJ 2021 (**JCR-1**)
    - `Authors`: Nguyen Huu Thanh; Nguyen Trung Kien; Ngo Van Hoa; Truong Thu Huong; Florian Wamser; Tobias Hossfeld
    - `Keywords`: VNFP, IoT, Edge, Energy
    - `Objective`: Energy consumption -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9373577/)

<details>
<summary> more </summary>

1. **Reliable Placement of Service Function Chains and Virtual Monitoring Functions With Minimal Cost in Softwarized 5G Networks**

    - `Publication`: TNSM 2021 (**JCR-Q1**)
    - `Authors`: Prabhu Kaliyammal Thiruvasagam; Abhishek Chakraborty; Abin Mathew; C. Siva Ram Murthy
    - `Keywords`: VNE, Optical Network, Data Center
    - `Objective`: Reduce complexity of the network topology by using the parallel transmission characteristics of optical fiber
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9345794)

1. **Dynamic VNF Placement, Resource Allocation and Traffic Routing in 5G**

   - `Publication`: CN 2021 (**CCF-B**)
   - `Authors`: Morteza Golkarifard, C. Chiasserini, F. Malandrino, A. Movaghar
   - `Keywords`: VNFP, Routing
   - `Objective`: Placement cost -
   - `Link`: [arXiv](https://arxiv.org/pdf/2102.09426.pdf)

1. **Efficient Virtual Network Embedding of Cloud-Based Data Center Networks into Optical Networks**

    - `Publication`: TSC 2021 (**CCF-B**)
    - `Authors`: Weibei Fan; Fu Xiao; Xiaobai Chen; Lei Cui; Shui Yu
    - `Keywords`: VNFP, Integer Linear Programming (ILP)
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9345794/)

1. **Energy and Cost Efficient Resource Allocation for Blockchain-Enabled NFV**

    - `Publication`: TSC 2021 (**CCF-B**)
    - `Authors`: Shiva Kazemi Taskou, Mehdi Rasti, Pedro H. J. Nardelli
    - `Keywords`: VNFP, Blockchain-Enabled, HuRA (Hungarian-based Resource Allocation), HuRA (Hungarian-based Resource Allocation)
    - `Objective`: Energy consumption -, Placement cost -
    - `Link`: [paper](https://arxiv.org/abs/2103.02139)

1. **Latency-aware VNF Chain Deployment with Efficient Resource Reuse at Network Edge**

   - `Publication`: INFOCOM 2020 (**CCF-A**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keywords`: VNFP, MILP (Mixed Integer Iinear Programming), Latency, CDFSA (constrained depth-first search algorithm)
   - `Objective`: Placement cost -, E2E Latency-
   - `Link`: [paper](https://fangmingliu.github.io/files/INFOCOM20-Edge-NFV.pdf)

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keywords`: VNFP, ILP (Integer Linear Program), Regularization, Rounding
   - `Objective`: Operating cost -, Placement cost -
   - `Link`: [paper](https://i.cs.hku.hk/~cwu/papers/zyluo-ton19.pdf)

1. **Reliability-Aware Virtualized Network Function Services Provisioning in Mobile Edge Computing**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Meitian Huang, Weifa Liang, Xiaojun Shen, Yu Ma, Haibin Kan
   - `Keywords`: VNFP, Reliability-aware, approximation algorithms, DP (dynamic programming), MEC (mobile edge computing)
   - `Objective`:  Maximize the network throughput
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8758846)

1. **Service Function Path Provisioning With Topology Aggregation in Multi-Domain Optical Networks**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Boyuan Yan; Yongli Zhao; Xiaosong Yu; Yajie Li; Sabidur Rahman; Yongqi He; Xiangjun Xin; Jie Zhang
   - `Keywords`: VNFP, Multi-domain
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9189853)

1. **Joint Resource Allocation and Routing for Service Function Chaining with In-Subnetwork Processing**

   - `Publication`: ICASSP 2020 (**CCF-B**)
   - `Authors`:  Navid Reyhanian; Hamid Farmanbar; Soheil Mohajer; Zhi-Quan Luo
   - `Keywords`: VNFP, Routing
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9054706)

1. **Congestion-Aware and Energy-Aware Virtual Network Embedding**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Minh Pham, Doan B. Hoang, Zenon Chaczko
   - `Keywords`: VNFP, relaxed LP (linear Program), Congestion, Energy, SR (Segment Routing)
   - `Objective`: Placement cost -, Energy Consumption -, Network congestion -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8945162)

1. **Efficient Algorithms for Delay-Aware NFV-Enabled Multicasting in Mobile Edge Clouds With Resource Sharing**

   - `Publication`: TPDS 2020 (**CCF-A**)
   - `Authors`:  Haozhe Ren; Zichuan Xu; Weifa Liang; Qiufen Xia; Pan Zhou; Omer F. Rana; Alex Galis; Guowei Wu
   - `Keywords`: VNFP, Latency
   - `Objective`: Latency -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9050847)

1. **Sova: A Software-Defined Autonomic Framework for Virtual Network Allocations**

   - `Publication`: TPDS 2020 (**CCF-A**)
   - `Authors`:  Zhiyong Ye, Yang Wang, Shuibing He, Chengzhong Xu, Xian-He Sun
   - `Keywords`: VNFP, VNFM, SDN
   - `Objective`: Optimize the network allocation between different services by coordinating virtual dynamic SR-IOV and virtual machine live migration in autonomic way
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9151358)

1. **Latency and Mobility-Aware Service Function Chain Placement in 5G Networks**

   - `Publication`: TMC 2020 (**CCF-A**)
   - `Authors`:  Davit Harutyunyan; Nashid Shahriar; Raouf Boutaba; Roberto Riggio
   - `Keywords`: VNFP, Latency, Mobility,  Edge computing
   - `Objective`: Latency -, Placement cost -, Energy consumption -, Qos +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9210756)

1. **Clustered Virtualized Network Functions Resource Allocation based on Context-Aware Grouping in 5G Edge Networks**

   - `Publication`: TMC 2020 (**CCF-A**)
   - `Authors`:  Sooeun Song; Changsung Lee; Hyoungjun Cho; Goeun Lim; Jong-Moon Chung
   - `Keywords`: VNFP, Latency, Mobility,  Edge computing
   - `Objective`: Mobility +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/8674579)

1. **Reducing the Service Function Chain Backup Cost over the Edge and Cloud by a Self-adapting Scheme**

   - `Publication`: TMC 2020 (**CCF-A**)
   - `Authors`:  Xiaojun Shang; Yaodong Huang; Zhenhua Liu; Yuanyuan Yang
   - `Keywords`: VNFP, Edge, Reliablity, Backup
   - `Objective`: Reliablity +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9312434)

1. **Approximation algorithms for data-intensive service chain embedding**

   - `Publication`: MobiHoc 2020(**CCF-B**)
   - `Authors`:  Konstantinos Poularakis, J. Llorca, A. Tulino, L. Tassiulas
   - `Keywords`: VNFP, Data-intensive
   - `Objective`: Placement cost -
   - `Link`: [ACM DL](https://dl.acm.org/doi/10.1145/3397166.3409149)

1. **Joint Availability- and Traffic-aware Placement of Parallelized Service Chain in NFV-enabled Data Center**

   - `Publication`: ICWS 2020 (**CCF-B**)
   - `Authors`:  Meng Wang; Bo Cheng; Junliang Chen
   - `Keywords`: VNFP, Parallelization, Multi-flow backup, Hybrid Placement Algorithm (HPA)
   - `Objective`: Latency -, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9284106)

1. **Optimal Virtual Network Function Deployment for 5G Network Slicing in a Hybrid Cloud Infrastructure**

   - `Publication`: TWC 2020 (**CCF-B**)
   - `Authors`:  Antonio De Domenico, Ya-Feng Liu, Wei Yu
   - `Keywords`: VNFP, ILP (Integer Linear Programming), Network Slicing
   - `Objective`: Lead to high resource utilization efficiency and large gains in terms of the number of supported VNF chains
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9177288)

1. **Virtual Network Embedding With Guaranteed Connectivity Under Multiple Substrate Link Failures**

    - `Publication`: TCOM 2020 (**CCF-B**)
    - `Authors`: Nashid Shahriar; Reaz Ahmed; Shihabur Rahman Chowdhury; Md Mashrur Alam Khan; Raouf Boutaba; Jeebak Mitra; Feng Zeng
    - `Keywords`: VNFP
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8906179/)

1. **Cost-Efficient VNF Placement and Scheduling in Public Cloud Networks**

   - `Publication`: TCOM 2020 (**CCF-B**)
   - `Authors`:  Tao Gao, Xin Li, Yu Wu , Weixia Zou, Shanguo Huang, Massimo Tornatore,  Biswanath Mukherjee
   - `Keywords`: VNFP, VNFS, Cost Efficiency,  Public Cloud
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9086616)

1. **Virtual Network Embedding With Guaranteed Connectivity Under Multiple Substrate Link Failures**

   - `Publication`: TCOM 2020 (**CCF-B**)
   - `Authors`:  Zhiyong Ye, Yang Wang, Shuibing He, Chengzhong Xu, Xian-He Sun
   - `Keywords`: VNFP, Connectivity, Fault Tolerance, Redundancy
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8906179)

1. **Reliability Aware Service Placement Using a Viterbi-Based Algorithm**

   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`:  Mohammad Karimzadeh-Farshbafan, Vahid Shah-Mansouri, Dusit Niyato
   - `Keywords`: VNFP, MICP (mixed integer convex programming), Viterbi-based
   - `Objective`: Minimize the cost of resources of the InPs and maximize the reliability of the service
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8933111)

1. **A Constructive Particle Swarm Optimizer for Virtual Network Embedding**

   - `Publication`: TNSE 2020 (**JCR-Q1**)
   - `Authors`: Yongqiang Gao; Haibing Guan; Zhengwei Qi; Yang Hou; Liang Liu
   - `Keywords`: VNFP, CPSO (Constructive Particle Swarm Optimizer)
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8786166)

1. **Energy-Efficient Machine-to-Machine (M2M) Communications in Virtualized Cellular Networks with Mobile Edge Computing (MEC)**

   - `Publication`: TMC 2019 (**CCF-A**)
   - `Authors`:  Meng Li; F. Richard Yu; Pengbo Si; Yanhua Zhang
   - `Keywords`: VNFP, Mobile, Edge, Energy, partially observable Markov decision process (POMDP)
   - `Objective`: Placement cost -, Energy consumption -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9312434)

1. **Network Topology Mapping From Partial Virtual Coordinates and Graph Geodesics**

    - `Publication`: TON 2019 (**CCF-A**)
    - `Authors`: Anura P. Jayasumana; Randy Paffenroth; Gunjan Mahindre; Sridhar Ramasamy; Kelum Gajamannage
    - `Keywords`: VNFP, Coordinates
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8924919)

1. **Virtual Network Embedding Approximations: Leveraging Randomized Rounding**

    - `Publication`: TON 2019 (**CCF-A**)
    - `Authors`: Matthias Rost; Stefan Schmid
    - `Keywords`: VNFP
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8846601)

1. **Adaptive Interference-Aware VNF Placement for Service-Customized 5G Network Slices**

    - `Publication`: INFOCOM 2019 (**CCF-A**)
    - `Authors`: Qixia Zhang, Fangming Liu, Chaobing Zeng
    - `Keywords`: VNFP, Interference
    - `Objective`:Acceptance rate +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8737544)

1. **Octans: Optimal Placement of Service Function Chains in Many-Core Systems**

    - `Publication`: INFOCOM 2019 (**CCF-A**)
    - `Authors`: Zhilong Zheng; Jun Bi; Heng Yu; Haiping Wang; Chen Sun; Hongxin Hu; Jianping Wu
    - `Keywords`: VNFP, Many-Core Systems
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8737544)

1. **Automated Function Placement and Online Optimization of Network Functions Virtualization**

    - `Publication`: TCOM 2019 (**CCF-B**)
    - `Authors`: Xiaojing Chen; Wei Ni; Iain B. Collings; Xin Wang; Shugong Xu
    - `Keywords`: VNFP, Latency
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8501940)

1. **Virtual Network Embedding with Path-based Latency Guarantees in Elastic Optical Networks**

    - `Publication`: ICNP 2019 (**CCF-B**)
    - `Authors`: Sepehr Taeb; Nashid Shahriar; Shihabur Rahman Chowdhury; Massimo Tornatore; Raouf Boutaba; Jeebak Mitra; Mahdi Hemmati
    - `Keywords`: VNFP, Optical Networks, Latency
    - `Objective`: Placement cost -, Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8888056)

1. **Network Function Deployment with Balanced Server and Link Resources in Tree Topologies**

    - `Publication`: SECON 2019 (**CCF-B**)
    - `Authors`: Yang Chen; Jie Wu
    - `Keywords`: VNFP, Tree Topology
    - `Objective`: Placement cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8824852)

1. **Provably Efficient Algorithms for Placement of Service Function Chains with Ordering Constraints**

   - `Publication`: INFOCOM 2018 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keywords`: VNFP, Equivalence with Hitting Set, Naive and Faster Greedy, LP-Rounding, DP (Dynamic Programming)
   - `Objective`: Minimize the total deployment cost
   - `Link`: [paper](https://hal.inria.fr/hal-01743273/document)

1. **Joint VNF Placement and CPU Allocation in 5G**

   - `Publication`: INFOCOM 2018 (**CCF-A**)
   - `Authors`: Satyam Agarwal; Francesco Malandrino; Carla-Fabiana Chiasserini; S. De
   - `Keywords`: VNFP, Joint
   - `Objective`:  Joint optimal decisions concerning the placement of VNFs across the physical hosts for realizing the services, and the allocation of CPU resources in VNFs sharing a host
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8485943)

1. **Enabling Efficient Network Service Function Chain Deployment on Heterogeneous Server Platform**

   - `Publication`: HPCA 2018 (**CCF-A**)
   - `Authors`: Yang Hu; Tao Li
   - `Keywords`: VNFP, Graph-partition, Reorganizing
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8326996)

1. **Multi-Timescale Online Optimization of Network Function Virtualization for Service Chaining**

   - `Publication`: TMC 2018 (**CCF-A**)
   - `Authors`: Xiaojing Chen; Wei Ni; Tianyi Chen; Iain B. Collings; Xin Wang; Ren Ping Liu; 
Georgios B. Giannakis
   - `Keywords`: VNFP
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8570806)

1. **Optimal Network Service Chain Provisioning**

   - `Publication`: TON 2018 (**CCF-A**)
   - `Authors`: Nicolas Huin; Brigitte Jaumard; Frédéric Giroire
   - `Keywords`: VNFP
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8362669)

1. **Deploying Chains of Virtual Network Functions: On the Relation Between Link and Server Usage**

   - `Publication`: TON 2018 (**CCF-A**)
   - `Authors`: Tung-Wei Kuo; Bang-Heng Liou; Kate Ching-Ju Lin; Ming-Jer Tsai
   - `Keywords`: VNFP
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8390937)

1. **Efficiently Embedding Service Function Chains with Dynamic Virtual Network Function Placement in Geo-Distributed Cloud System**

   - `Publication`: TPDS 2018 (**CCF-A**)
   - `Authors`: Jianing Pei; Peilin Hong; Kaiping Xue; Defang Li
   - `Keywords`: VNFP, Distributed, Binary Integer Programming (BIP)
   - `Objective`:  Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8532318)

1. **Virtual Network Function Placement Considering Resource Optimization and SFC Requests in Cloud Datacenter**

   - `Publication`: TPDS 2018 (**CCF-A**)
   - `Authors`: Defang Li; Peilin Hong; Kaiping Xue; jianing Pei
   - `Keywords`: VNFP, Data Center
   - `Objective`:  Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8281644)

1. **LVRM: On the Design of Efficient Link Based Virtual Resource Management Algorithm for Cloud Platforms**

   - `Publication`: TPDS 2018 (**CCF-A**)
   - `Authors`: Prasan Kumar Sahoo; Chinmaya Kumar Dehury; Bharadwaj Veeravalli
   - `Keywords`: VNFP, Cloud
   - `Objective`:  Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8169111)

1. **Virtual Network Function Deployment in Tree-Structured Networks**

   - `Publication`: ICNP 2018 (**CCF-B**)
   - `Authors`: Yang Chen; Jie Wu; Bo Ji
   - `Keywords`: VNFP, Tree Topology
   - `Objective`:  Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8526811)

1. **Rethinking Virtual Network Embedding in Reconfigurable Networks**

   - `Publication`: SECON 2018 (**CCF-B**)
   - `Authors`: Max Curran; Md. Shaifur Rahman; Himanshu Gupta; Vyas Sekar
   - `Keywords`: VNFP
   - `Objective`:  Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8397143)

1. **Distributed Virtual Network Embedding System With Historical Archives and Set-Based Particle Swarm Optimization**

   - `Publication`: TSMC 2018 (**JCR-Q1**)
   - `Authors`: An Song; Wei-Neng Chen; Tianlong Gu; Huaqiang Yuan; Sam Kwong; Jun Zhang	
   - `Keywords`: VNFP, Distributed, Particle Swarm Optimization (PSO)
   - `Objective`:  Acceptance rate +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8600712)

1. **Mobility Aware Virtual Network Embedding**

   - `Publication`: TMC 2017 (**CCF-A**)
   - `Authors`: Giorgos Chochlidakis; Vasilis Friderikos
   - `Keywords`: VNFP, Mobility, Distributed 
   - `Objective`:  Acceptance rate +, Mobility +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7514764)

1. **Congestion-Aware Embedding of Heterogeneous Bandwidth Virtual Data Centers With Hose Model Abstraction**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Fangfang Yan; Tony T. Lee; Weisheng Hu
   - `Keywords`: VNFP, Congestion
   - `Objective`:  Placement cost -, Congestion -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7574364)

1. **Online Allocation of Virtual Machines in a Distributed Cloud**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Fang Hao; Murali Kodialam; T. V. Lakshman; Sarit Mukherjee
   - `Keywords`: VNFP, Distributed
   - `Objective`:  Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7509597)

1. **An Approach for Service Function Chain Routing and Virtual Function Network Instance Migration in Network Function Virtualization Architectures**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Vincenzo Eramo; Emanuele Miucci; Mostafa Ammar; Francesco Giacinto Lavacca
   - `Keywords`: VNFP, VNFS,  Joint, energy
   - `Objective`:  Acceptance rate +, Energy consumption -	
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7866881)

1. **Optimizing Virtual Backup Allocation for Middleboxess**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Yossi Kanizo; Ori Rottenstreich; Itai Segall; Jose Yallouz
   - `Keywords`: VNFP, Backup
   - `Objective`:  Placement cost -	
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7938678)

1. **Reliable Virtual Machine Placement and Routing in Clouds**

   - `Publication`: TPDS 2017 (**CCF-A**)
   - `Authors`: Song Yang; Philipp Wieder; Ramin Yahyapour; Stojan Trajanovski; Xiaoming Fu
   - `Keywords`: VNFP, Routing, Cloud, Latency
   - `Objective`:  Placement cost -, Latency -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8281644)

1. **Multi-resource Load Balancing for Virtual Network Functions**

   - `Publication`: ICDCS 2017 (**CCF-B**)
   - `Authors`: Tao Wang; Hong Xu; Fangming Liu
   - `Keywords`: VNFP, Load Balancing, Multi-resource
   - `Objective`:  Load Balancing +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7980072)

1. **SLA-NFV: an SLA-aware High Performance Framework for Network Function Virtualization**

   - `Publication`: SIGCOMM 2016 (**CCF-A**)
   - `Authors`: Chen Sun, Jun Bi, Zhilong Zheng, Hongxin Hu
   - `Keywords`: VNFP, Latency
   - `Objective`:  Latency +
   - `Link`: [ACM DL](https://dl.acm.org/doi/10.1145/2934872.2959058)

1. **Deploying chains of virtual network functions: On the relation between link and server usage**

   - `Publication`: INFOCOM 2016 (**CCF-A**)
   - `Authors`: Tung-Wei Kuo; Bang-Heng Liou; Kate Ching-Ju Lin; Ming-Jer Tsai
   - `Keywords`: VNFP
   - `Objective`:  Acceptance rate +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7524565)

1. **Toward Profit-Seeking Virtual Network Embedding**

   - `Publication`: INFOCOM 2014 (**CCF-A**)
   - `Authors`: Long Gong, Yonggang Wen, Zuqing Zhu and Tony Lee
   - `Keywords`: VNFP, GRC (Global Resource Control)
   - `Objective`: Acceptance rate +, Revenue-to-cost ratio +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/6847918)

1. **A Multi-objective Ant Colony System algorithm for Virtual Machine Placement in Cloud Computing**

   - `Publication`: JCSS 2013 (**CCF-B**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keywords`: VNFP, ACS (Ant Colony System), Multi-objective
   - `Objective`: Placement cost -, Energy consumption -
   - `Link`: [IEEE Xplore](https://www.sciencedirect.com/science/article/pii/S0022000013000627)

1. **Virtual Network Embedding through Topology Awareness and Optimization**

   - `Publication`: CN 2012 (**CCF-B**)
   - `Authors`: Xiang Cheng, Sen Su, Zhongbao Zhang, Kai Shuang, Fangchun Yang, Yan Luo, Jie Wang
   - `Keywords`: VNFP, PSO (Particle Swarm Optimization), Topology decomposition
   - `Objective`: Minimize total resource wastage and power Consumption
   - `Link`: [IEEE Xplore](https://www.researchgate.net/publication/257582253_Virtual_network_embedding_through_topology_awareness_and_optimization)

</details>

### [3.4 VNFS](#content)

1. **HASFC: A MANO-Compliant Framework for Availability Management of Service Chains**

   - `Publication`: IEEE Communications Magazine 2021 (**JCR-Q1**)
   - `Authors`: Mario Di Mauro; Giovanni Galatro; Maurizio Longo; Fabio Postiglione; Marco Tambasco
   - `Keywords`: VNFS, VNFP, Reliabilty
   - `Objective`: Cost -, Reliabilty +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9376772)

1. **Highly-Efficient Switch Migration for Controller Load Balancing in Elastic Optical Inter-Datacenter Networks**

   - `Publication`: JSAC 2021 (**CCF-A**)
   - `Authors`: Yong Liu; Huaxi Gu; Fulong Yan; Nicola Calabretta
   - `Keywords`: VNFS, Migration, Data Center
   - `Objective`: Cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9376772)

1. **Joint Resource Optimization and Delay-aware Virtual Network Function Migration in Data Center Networks**

   - `Publication`: TNSM 2020 (**CCF-A**)
   - `Authors`: Biyi Li; Bo Cheng; Xuan Liu; Meng Wang; Yi Yue; Junliang Chen
   - `Keywords`: VNFS, Migration, Latency
   - `Objective`: Placement cost -, Latency -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9383101)

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Ziyue Luo; Chuan Wu
   - `Keywords`: VNFS, Scaling
   - `Objective`: Deployment cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9046286)

1. **NFVnice: Dynamic Backpressure and Scheduling for NFV Service Chains**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Sameer G. Kulkarni; Wei Zhang; Jinho Hwang; Shriram Rajagopalan; K. K. Ramakrishnan; Timothy Wood; Mayutan Arumaithurai; Xiaoming Fu
   - `Keywords`: VNFS
   - `Objective`: Energy Consumption -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9007052)

1. **A Multi-Stage Approach for Virtual Network Function Migration and Service Function Chain Reconfiguration in NFV-enabled Networks**

   - `Publication`: ICWS 2020 (**CCF-B**)
   - `Authors`:  Biyi Li; Bo Cheng; Junliang Chen
   - `Keywords`: VNFS, Migration
   - `Objective`: Latency -, Load balancing +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9284106)

1. **Finedge: A Dynamic Cost-Efficient Edge Resource Management Platform for NFV Network**

   - `Publication`: ICWS 2020 (**CCF-B**)
   - `Authors`: Miao Li; Qixia Zhang; Fangming Liu
   - `Keywords`: VNFS
   - `Objective`: QoS +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8030071)

1. **Dynamic Cloud Network Control Under Reconfiguration Delay and Cost**

   - `Publication`: TON 2019 (**CCF-A**)
   - `Authors`: Chang-Heng Wang; Jaime Llorca; Antonia M. Tulino; Tara Javidi
   - `Keywords`: VNFS, Reconfiguration, Latency
   - `Objective`: Latency -, Cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8626768)

1. **Dynamic Network Function Instance Scaling Based on Traffic Forecasting and VNF Placement in Operator Data Centers**

   - `Publication`: TPDS 2019 (**CCF-A**)
   - `Authors`: Hong Tang; Danny Zhou; Duan Chen
   - `Keywords`: VNFS, VNFP, Scaling, Traffic Forecasting, Data Center
   - `Objective`: Cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8449985)

1. **Network Virtualization with Energy Efficiency Optimization for Wireless Heterogeneous Networks**

   - `Publication`: TMC 2019 (**CCF-A**)
   - `Authors`: Tai Manh Ho; Nguyen H. Tran; Long Bao Le; Zhu Han; S.M Ahsan Kazmi; Choong Seon Hong
   - `Keywords`: VNFS, Migration, Heterogeneous
   - `Objective`: Revenue of InP +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8476209)

1. **A multi-criteria decision approach for minimizing the influence of VNF migration**

   - `Publication`: CN 2019 (**CCF-B**)
   - `Authors`: Bo Yi, X. Wang, Min Huang, Anwei Dong
   - `Keywords`: VNFS, Migration
   - `Objective`: Influence -
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128619304748?via%3Dihub)

1. **Network Function Virtualization in Dynamic Networks: A Stochastic Perspective**

    - `Publication`: JSAC 2018 (**CCF-A**)
    - `Authors`: Xiangle Cheng; Yulei Wu; Geyong Min; Albert Y. Zomaya
    - `Keywords`: VNFP, Dynamic
    - `Objective`: /
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8463557/)

1. **Energy-Aware Virtual Machine Scheduling on Data Centers with Heterogeneous Bandwidths**

    - `Publication`: TPDS 2018 (**CCF-A**)
    - `Authors`: Daniel Guimaraes Lago; Edmundo R. M. Madeira; Deep Medhi
    - `Keywords`: VNFS, Energy, Heterogeneous 
    - `Objective`: Energy consumption -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8039210/)

1. **TerrierTail: Mitigating Tail Latency of Cloud Virtual Machines**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Esmail Asyabi; SeyedAlireza SanaeeKohroudi; Mohsen Sharifi; Azer Bestavros
   - `Keywords`: VNFS, Latency
   - `Objective`: Latency -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8338088)

1. **Traffic-Aware Virtual Machine Migration in Topology-Adaptive DCN**

   - `Publication`: TON 2017 (**CCF-A**)
   - `Authors`: Yong Cui; Zhenjie Yang; Shihan Xiao; Xin Wang; Shenghui Yan
   - `Keywords`: VNFS, Migration
   - `Objective`: Thoughtout +, cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8030071)

1. **Mobile Edge Cloud Network Design Optimization**

    - `Publication`: TON 2017 (**CCF-A**)
    - `Authors`: Alberto Ceselli; Marco Premoli; Stefano Secc
    - `Keywords`: VNFS
    - `Objective`: Cost -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7842598/)

1. **Cluster-Aware Virtual Machine Collaborative Migration in Media Cloud**

   - `Publication`: TPDS 2017 (**CCF-A**)
   - `Authors`: Lingfang Zeng; Yang Wang; Xiaopeng Fan; Chengzhong Xu
   - `Keywords`: VNFS
   - `Objective`: Latency -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7883963)

1. **Cluster-Aware Virtual Machine Collaborative Migration in Media Cloud**

   - `Publication`: TPDS 2017 (**CCF-A**)
   - `Authors`: Weizhan Zhang; Yuxuan Chen; Xiang Gao; Zhichao Mo; Qinghua Zheng; Zongqing Lu
   - `Keywords`: VNFS, Migration
   - `Objective`: Cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7909001)

### [3.5 Routing](#content)

1. **Real-Time Update of Joint SFC and Routing in Software Defined Networks**

    - `Publication`: TON 2021 (**CCF-A**)
    - `Authors`: Xingpeng Fan; Hongli Xu; He Huang; Xuwei Yang
    - `Keywords`: Routing, Joint, Latency
    - `Objective`: Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9488289/)

1. **Software-defined Internet of Multimedia Things: Energy-efficient and Load-balanced Resource Management**

    - `Publication`: IoTJ 2021 (**JCR-1**)
    - `Authors`: Jianhang Tang; Jiangtian Nie; Zehui Xiong; Jun Zhao; Yang Zhang; Dusit Niyato
    - `Keywords`: Routing, IoT, Energy, Load Balancing
    - `Objective`: Energy consumption -, Load Balancing +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9475487/)

1. **Congestion Minimization for Service Chain Routing Problems With Path Length Considerations**

    - `Publication`: TON 2021  (**CCF-A**)
    - `Authors`: Lingnan Gao; George N. Rouskas
    - `Keywords`: Routing
    - `Objective`: Congestion -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9488289/)

1. **Congestion Minimization for Service Chain Routing Problems With Path Length Considerations**

    - `Publication`: TON 2020 (**CCF-A**)
    - `Authors`: Lingnan Gao; George N. Rouskas
    - `Keywords`: Routing, Congestion
    - `Objective`: Congestion -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9178487/)

1. **Throughput Maximization of NFV-Enabled Multicasting in Mobile Edge Cloud Networks**

    - `Publication`: TPDS 2020 (**CCF-A**)
    - `Authors`: Yu Ma; Weifa Liang; Jie Wu; Zichuan Xu
    - `Keywords`: Routing, Edge, Energy, Multicasting
    - `Objective`: /
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8812911/)

1. **Throughput-Optimal Broadcast in Wireless Networks with Dynamic Topology**

    - `Publication`: TMC 2020 (**CCF-A**)
    - `Authors`: Abhishek Sinha; Leandros Tassiulas; Eytan Modiano
    - `Keywords`: Routing, Dynamic
    - `Objective`: Throughput +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8382286/)

1. **On SDN-Driven Network Optimization and QoS Aware Routing Using Multiple Paths**

    - `Publication`: TWC 2020 (**CCF-B**)
    - `Authors`: Miloud Bagaa; Diego Leonel Cadette Dutra; Tarik Taleb; Konstantinos Samdanis
    - `Keywords`: Routing
    - `Objective`: Throughput +
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9067027/)


## [4. Machine Learning-based Methods](#content) 

> This is an interesting and promising research direction, looking forward to your participation!

### [4.1 Slicing](#content)

1. **A Constrained Reinforcement Learning Based Approach for Network Slicing**
   - `Publication`: ICNP 2020 (**CCF-B**)
   - `Authors`: Yongshuai Liu; Jiaxin Ding; Xin Liu
   - `Keywords`: Slicing
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9259378)

### [4.2 VNFC](#content)

1. **Space-Air-Ground Integrated Multi-Domain Network Resource Orchestration Based on Virtual Network Architecture: A DRL Method**
   - `Publication`: TITS 2021 (**CCF-B**)
   - `Authors`: Peiying Zhang; Chao Wang; Neeraj Kumar; Lei Liu
   - `Keywords`: VNFC, VNFP, Multi-Domain, DQN
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9505612)
   
1. **Scalable Orchestration of Service Function Chains in NFV-Enabled Networks: A Federated Reinforcement Learning Approach**

   - `Publication`: JSAC 2021 (**CCF-A**)
   - `Authors`: Haojun Huang, Cheng Zeng, Yangmin Zhao, Geyong Min, Yingying Zhu, Wang Miao , and Jia Hu
   - `Keywords`: VNFC, VNFP, DQN, FL (Federated Learning)
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9468364)

1. **Endogenous Trusted DRL-Based Service Function Chain Orchestration for IoT**

   - `Publication`: TC 2021 (**CCF-A**)
   - `Authors`: Shaoyong Guo; Yuanyuan Qi; Yi Jin; Wenjing Li; Xuesong Qiu; Luoming Meng
   - `Keywords`: VNFC, A3C (Asynchronous Advantage Actor-Critic)
   - `Objective`: Orchestration cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9326381)

### [4.3 VNFP](#content)

1. **Dynamic Virtual Network Embedding Algorithm based on Graph Convolution Neural Network and Reinforcement Learning**

   - `Publication`: IoTJ 2021 (**JCR-Q1**)
   - `Authors`: Peiying Zhang; Chao Wang; Neeraj Kumar; Weishan Zhang; Lei Liu
   - `Keywords`: VNFP, GNN, GCN, MDP (Markov Decision Process), Viterbi algorithm
   - `Objective`: Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9475485)

1. **On the Effective Parallelization and Near-Optimal Deployment of Service Function Chains**

    - `Publication`: TPDS 2021 (**CCF-A**)
    - `Authors`: Jianzhen Luo; Jun Li; Lei Jiao; Jun Cai
    - `Keywords`: VNFP, Parallelization, Viterbi Dynamic Programming algorithm
    - `Objective`: Latency -
    - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9300184)

1. **A-DDPG: Attention Mechanism-based Deep Reinforcement Learning for NFV**

   - `Publication`: IWQoS 2021 (**CCF-B**)
   - `Authors`: Nan He, S. Yang, Fan Li, S. Trajanovski, F.A. Kuipers, Xiaoming Fu
   - `Keywords`: VNFP, Attention, DDPG, Latency
   - `Objective`: Placement cost -, Latency -
   - `Link`: [paper](https://research.tudelft.nl/files/93969106/IWQoS2021.pdf)

1. **A Heuristically Assisted Deep Reinforcement Learning Approach for Network Slice Placement**

   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`: Jose Jurandir Alves Esteves, Amina Boubendir, Fabrice Guillemin, Pierre Sens
   - `Keywords`: VNFP, A3C, GCN
   - `Objective`: Acceptance rate +
   - `Link`: [arXiv](https://arxiv.org/abs/2105.06741)

1. **Automatic Virtual Network Embedding: A Deep Reinforcement Learning Approach With Graph Convolutional Networks**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keywords`: VNFP, A3C (Asynchronous Advantage Actor-Critic), GNN, GCN (Graph Convolutional Network)
   - `Objective`: Acceptance rate +, Long-term average revenue +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9060910)
   
1. **MUVINE: Multi-Stage Virtual Network Embedding in Cloud Data Centers Using Reinforcement Learning-Based Predictions**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Hiren Kumar Thakkar, Chinmaya Dehury, Prasan Kumar Sahoo
   - `Keywords`: VNFP, Q-learning, ML(Machine Learning), Multi-Stage
   - `Objective`: Long-term average revenue +, Placement cost -
   - `Link`: [paper](http://120.126.16.250/Publication_PDF/journal/j44.pdf)

1. **Optimal VNF Placement via Deep Reinforcement Learning in SDN/NFV-Enabled Networks**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Jianing Pei, Peilin Hong, Miao Pan, Jiangqing Liu, Jingsong Zhou
   - `Keywords`: VNFP, DDQN (Double Deep Q Network), BIP (Binary Integer Programming)
   - `Objective`: Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8932445)

1. **A Dynamic Reliability-Aware Service Placement for Network Function Virtualization (NFV)**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keywords`: VNFP, Dynamic Reliability-aware, MDP (Markov Decision Process), Viterbi algorithm
   - `Objective`: Acceptance rate +, Placement cost -
   - `Link`: [arXiv](https://arxiv.org/abs/1911.06532)

1. **Dynamic Service Function Chain Embedding for NFV-Enabled IoT: A Deep Reinforcement Learning Approach**

   - `Publication`: TWC 2020 (**CCF-B**)
   - `Authors`: Xiaoyuan Fu; F. Richard Yu; Jingyu Wang; Qi Qi; Jianxin Liao
   - `Keywords`: VNFP, Latency, DQN, Dynamic
   - `Objective`: Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8874993)

1. **A Dynamic and Collaborative Multi-Layer Virtual Network Embedding Algorithm in SDN Based on Reinforcement Learning**

   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`: Mohammad Karimzadeh-Farshbafan; Vahid Shah-Mansouri; Dusit Niyato
   - `Keywords`: VNFP, Collaborative, Multi-Layer, REINFORCE
   - `Objective`: Acceptance rate +, Long-term average revenue +
   - `Link`: [IEEE Xplore](http://ieeexplore.ieee.org/document/9151980)

1. **DDQP: A Double Deep Q-Learning Approach to Online Fault-Tolerant SFC Placement**
   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`: Lei Wang; Weixi Mao; Jin Zhao; Yuedong Xu
   - `Keywords`: VNFP, DDQN
   - `Objective`: Acceptance rate +, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9313044)

1. **A Continuous-Decision Virtual Network Embedding Scheme Relying on Reinforcement Learning**
   
   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`: Haipeng Yao; Sihan Ma; Jingjing Wang; Peiying Zhang; Chunxiao Jiang; Song Guo
   - `Keywords`: Continuous-Decision, Time Series, RNN, Seq2Seq
   - `Objective`: Long term average revenue to cost ratio +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8982091)

1. **A Privacy-Preserving Reinforcement Learning Algorithm for Multi-Domain Virtual Network Embedding**

   - `Publication`: TNSM 2020 (**JCR-Q1**)
   - `Authors`: Davide Andreoletti, Tanya Velichkova, Giacomo Verticale, Massimo Tornatore , Silvia Giordano
   - `Keywords`: VNFP, Multi-domain, Privacy
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9187205)

1. **Multi-domain Non-cooperative VNF-FG Embedding: A Deep Reinforcement Learning Approach**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Pham Tran Anh Quang, Abbas Bradai, Kamal Deep Singh, Yassine Hadjadj-Aoul
   - `Keywords`: VNFP, DDPG (Deep Deterministic Policy Gradient), Multi-domain, Non-cooperative
   - `Link`: [paper](https://hal.archives-ouvertes.fr/hal-02088819/file/MultiDomain_VNF_FG_embedding__A_Deep_reinforcement_learning_approach-authors%20version.pdf)

1. **DeepViNE: Virtual Network Embedding with Deep Reinforcement Learning**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Mahdi Dolati, Seyedeh Bahereh Hassanpour, Majid Ghaderi, Ahmad Khonsari
   - `Keywords`: VNFP, DQN (Deep Q Network), Multi-channels Representations
   - `Objective`: Acceptance rate +
   - `Link`: [paper](https://people.ucalgary.ca/~mghaderi/docs/infocom19-deepvine.pdf)

1. **Virtual Network Function Placement Optimization with Deep Reinforcement Learning**

   - `Publication`: JSAC 2019 (**CCF-A**)
   - `Authors`: Ruben Solozabal, Josu Ceberio, Aitor Sanchoyerto, Luis Zabala, Bego Blanco, Fidel Liberal
   - `Keywords`: VNFP, PG (Policy Gradient), Seq2Seq (Sequence-to-Sequence)
   - `Objective`: Energy consumption -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8945291)

1. **NFVdeep: adaptive online service function chain deployment with deep reinforcement learning**

   - `Publication`: IWQoS 2019 (**CCF-B**)
   - `Authors`: Yikai  Xiao, Qixia  Zhang, Fangming Liu, Jia  Wang, Miao  Zhao, Zhongxing  Zhang, Jiaxing  Zhang
   - `Keywords`: VNFP, PG (Policy Gradient), Serialization and Backtracking, Time Slots
   - `Objective`:  Energy consumption -, Acceptance rate +
   - `Link`: [paper](https://www.researchgate.net/publication/333789998_NFVdeep_adaptive_online_service_function_chain_deployment_with_deep_reinforcement_learning)

1. **VNE-TD: A virtual network embedding algorithm based on temporal-difference learning**

   - `Publication`: CN 2019 (**CCF-B**)
   - `Authors`: Sen Wang, Jun Bi, Jianping Wu, Athanasios V. Vasilakos, Qilin Fan
   - `Keywords`: VNFP, TD (Temporal Difference), GRC (Global Resource Control)
   - `Objective`: Long-term time-average revenue +
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S138912861830584X)

1. **Virtual Network Embedding via Monte Carlo Tree Search**

   - `Publication`: IEEE Trans on Cybernetics 2018 (**CCF-B**)
   - `Authors`: Soroush Haeri and Ljiljana Trajkovi´c
   - `Keywords`: VNFP, MCTS (Monte Carlo Tree Search)
   - `Objective`: Revenue-to-cost +, Acceptance rate +
   - `Link`: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

1. **An Efficient Algorithm for Virtual Network Function Placement and Chaining**

   - `Publication`: CCNC 2017
   - `Authors`: Oussama Soualah, Marouen Mechtri, Chaima Ghribi, Djamal Zeghlache
   - `Keywords`: VNFP, MCTS (Monte Carlo Tree Search)
   - `Objective`: Acceptance rate +
   - `Link`: [paper](https://www.researchgate.net/publication/318579373_An_efficient_algorithm_for_virtual_network_function_placement_and_chaining)

### [4.4 VNFS](#content)

1. **Reliability-aware Dynamic Service Chain Scheduling in 5G Networks based on Reinforcement Learning**
   
   - `Publication`: INFOCOM 2021 (**CCF-A**)
   - `Authors`: Junzhong Jia; Lei Yang; Jiannong Cao
   - `Keywords`: VNFS, MIIP, Reliability, Redundancy, A3C, TextCNN
   - `Objective`: Decide the redundancy of the VNFs while minimizing delay
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9488707/)

1. **Management and Orchestration of Virtual Network Functions via Deep Reinforcement Learning**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Joan S. Pujol Roig; David M. Gutierrez-Estevez; Deniz Gündüz
   - `Keywords`: VNFS, VNFC, Actor-Critic
   - `Objective`: Cost -, QoS +
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8932565)

1. **Intelligent VNF Orchestration and Flow Scheduling via Model-Assisted Deep Reinforcement Learning**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Lin Gu, Deze Zeng, Wei Li, Song Guo, Albert Y. Zomaya, Hai Jin
   - `Keywords`: VNFS, Latency-awareness, flow, DDPG (Deep Deterministic Policy Gradient)
   - `Objective`: Maximize the overall network utility with the consideration of end-to-end delay and various cost
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8931775)

1. **Virtual Network Functions Migration Cost: from Identification to Prediction**
    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Rafael de JesusMartins, Cristiano Bonato Both, Juliano Araújo Wickboldt, Lisandro Zambenedett iGranville
    - `Keywords`: VNFS, SL, Linear regression
    - `Objective`: A novel architecture for orchestrating and enforcing multi-domain SFCs
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S138912862031118X)

1. **Deep Reinforcement Learning based VNF Management in Geo-distributed Edge Computing**

   - `Publication`: ICDCS 2019 (**CCF-B**)
   - `Authors`: Lin Gu, Deze Zeng, Wei Li, Song Guo, Albert Y. Zomaya, Hai Jin
   - `Keywords`: VNFS, Latency-awareness, flow, DDPG (Deep Deterministic Policy Gradient)
   - `Objective`: Latency -, Placement cost -
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8885151)

### [4.5 Routing](#content)

1. **DRL-OR: Deep Reinforcement Learning-based Online Routing for Multi-type Service Requirements**

   - `Publication`: INFOCOM 2021 (**CCF-A**)
   - `Authors`: Chenyi Liu; Mingwei Xu; Yuan Yang; Nan Geng
   - `Keywords`: VNFS, Latency, Multi-agent, PPO
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9488736/)

1. **Towards Real-Time Routing Optimization with Deep Reinforcement Learning: Open Challenges**

   - `Publication`: INFOCOM 2021 (**CCF-A**)
   - `Authors`: Paul Almasan, José Suárez-Varela, Bo Wu, Shihan Xiao, Pere Barlet-Ros, Albert Cabellos-Aparicio
   - `Keywords`: RL, GNN, PPO
   - `Link`: [arXiv](https://arxiv.org/abs/2106.09754)

1. **A Multi-agent Reinforcement Learning Perspective on Distributed Traffic Engineering**

   - `Publication`: ICNP 2020 (**CCF-B**)
   - `Authors`: Nan Geng; Tian Lan; Vaneet Aggarwal; Yuan Yang; Mingwei Xu
   - `Keywords`: VNFS, Multi-agent, Traffic Engineering
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9259413/)

1. **Unveiling the potential of Graph Neural Networks for network modeling and optimization in SDN**
   - `Publication`: SOSR 2019
   - `Authors`: Krzysztof Rusek, José Suárez-Varela, Albert Mestres, Pere Barlet-Ros, Albert Cabellos-Aparicio
   - `Keywords`: Routing, SL (Surpervised Learning), GNN
   - `Link`: [arXiv](https://arxiv.org/abs/1901.08113)
   
1. **Routing or Computing? The Paradigm Shift Towards Intelligent Computer Network Packet Transmission Based on Deep Learning**

   - `Publication`: TC 2019 (**CCF-A**)
   - `Authors`: Bomin Mao; Zubair Md. Fadlullah; Fengxiao Tang; Nei Kato; Osamu Akashi; Takeru Inoue; Kimihiro Mizutani
   - `Keywords`: Routing, SL (Surpervised Learning)
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7935536)

## [5. Other & Unassorted](#content)

> Here are two types of papers: one is related to other topics of NFV and SDN and waiting to be classified; the other is the latest research work collected from arXiv.

1. **The Greatest Teacher, Failure is: Using Reinforcement Learning for SFC Placement Based on Availability and Energy Consumption**

   - `Authors`: Guto Leoni Santos, Theo Lynn, Judith Kelner, Patricia Takako Endo
   - `Link`: [arXiv](https://arxiv.org/abs/2010.05711)

1. **Learning based E2E Energy Efficient in Joint Radio and NFV Resource Allocation for 5G and Beyond Networks**

   - `Authors`: Narges Gholipoor, Ali Nouruzi, Shima Salarhosseini, Mohammad Reza Javan, Nader Mokari, Eduard A. Jorswieck
   - `Link`: [arXiv](https://arxiv.org/abs/2107.05991)

1. **When SRv6 meets 5G Core: Implementation and Deployment of a Network Service Chaining Function in SmartNICs**

   - `Authors`: Guilherme Matos, Fabio Luciano Verdi, Luis Miguel Contreras, Leandro C. de Almeida
   - `Link`: [arXiv](https://arxiv.org/abs/2107.11966)

1. **End-to-End Delay Guaranteed SFC Deployment: A Multi-level Mapping Approach**

   - `Authors`: Fatemeh Yaghoubpour, Bahador Bakhshi, Fateme Seifi
   - `Link`: [arXiv](https://arxiv.org/abs/2102.06090)

1. **Service Function Chaining in MEC: A Mean-Field Game and Reinforcement Learning Approach**

   - `Authors`: Amine Abouaomar, Soumaya Cherkaoui, Zoubeir Mlika, Abdellatif Kobbane
   - `Link`: [arXiv](https://arxiv.org/abs/2105.04701)

1. **vSFC: Generic and Agile Verification of Service Function Chains in the Cloud**

   - `Publication`: TON 2021 (**CCF-A**)
   - `Authors`: Xiaoli Zhang; Qi Li; Zeyu Zhang; Jianping Wu; Jiahai Yang
   - `Keywords`: Verification
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9240965)

1. **Looking Glass of NFV: Inferring the Structure and State of NFV Network From External Observations**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Yilei Lin; Ting He; Shiqiang Wang; Kevin Chan; Stephen Pasteris
   - `Keywords`: Framework
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9078846)

1. **Adding Support for Automatic Enforcement of Security Policies in NFV Networks**

   - `Publication`: TON 2019 (**CCF-A**)
   - `Authors`: Cataldo Basile; Fulvio Valenza; Antonio Lioy; Diego R. Lopez; Antonio Pastor Perales
   - `Keywords`: Security
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8637976)

1. **Design, Implementation and Verification of Cloud Architecture for Monitoring a Virtual Machine's Security Health**

   - `Publication`: TC 2018 (**CCF-A**)
   - `Authors`: Tianwei Zhang; Ruby B. Lee
   - `Keywords`: Security
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8169039)

## Contributing

😃Favorably receive that submit relevant papers to this repository in the appropriate format:

```markdown
# Exemples

## A template of the survey / analysis

1. **Recent Advances of Resource Allocation in Network Function Virtualization**

- `Publication`: TPDS 2021 (**CCF-A**)
- `Authors`: Song Yang, Fan Li, Stojan Trajanovski, Ramin Yahyapour, Xiaoming Fu
- `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9169857)

## A template of the research paper

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**

- `Publication`: TON 2020 (**CCF-A**)
- `Authors`: Ziyue Luo, Chuan Wu
- `Keywords`: VNFS, VNFP, ILP (Integer Linear Program), Regularization, Rounding
- `Objective`: Minimize the operating cost and deployment cost
- `Link`: [paper](https://i.cs.hku.hk/~cwu/papers/zyluo-ton19.pdf)
```


## Recommend

🤩There are some repositories which probably help you to comprehend or research this topic: 

- [GNN-Communication-Networks](https://github.com/jwwthu/GNN-Communication-Networks)
- [awesome-rl (Awesome Reinforcement Learning)](https://github.com/aikorea/awesome-rl)
- [awesome-ml4co (Awesome Machine Learning for Combinatorial Optimization Resources)](https://github.com/Thinklab-SJTU/awesome-ml4co)

