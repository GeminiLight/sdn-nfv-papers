# Papers on NFV-RA

This is a paper list about Resource Allocation in  [Network Functions Virtualization](https://en.wikipedia.org/wiki/Network_function_virtualization) (NFV) and [Software-Defined Networking](https://en.wikipedia.org/wiki/Software-defined_networking) (SDN), including

- Comprehensive **Surveys**
- **VNE**: Virtual Network Embedding Algorithms
- **VNFC**: Virtual Network Functions Chaining (also known as  Service Function Chains Orchestration) Algorithms
- **VNFP**: Virtual Network Functions Placement (also known as  Service Function Chains Deployment) Algorithms
- **VNFF**: Virtual Network Functions Migration Algorithms
- **VNFS**: Virtual Network Functions Scheduling Algorithms
- **Multi-domain**: also known as cross-domain, multi-region or other resemble name.

Particularly, we mainly collect papers from high-quality journals and conferences, and **classify them according to method categories**.

**Favorably receive that submit relevant papers to this repository in the appropriate format.**


### Search by Keywords

You can search the relevant papers by following keywords:

- **Direction**: `VNE`, `VNFC`, `VNFP`, `VNFF`, `VNFS`, `Multi-domain`
- **Publication**: `JSAC`, `TON`, `INFOCOM`, `CN`, ...
- **PUB-rank**: `CCF-A`, `CCF-B`, `JCR-Q1`, ...
- **Awareness**: `Latency`, `Reliability`, `Congestion`, `Privacy`
- **RL-ALGO**: `DQN`, `DDPG`, `A3C`, ...
- **NN-type**: `CNN`, `RNN`, `GNN`, ...


## [Content](#content)

- <a href="#survey-papers">Survey</a>
- <a href="#mathematical-based">Mathematical-based</a>
- <a href="#heuristic-based">Heuristic-based</a>
  - <a href="#basic-heuristics">Basic heuristics</a>
  - <a href="#meta-heuristics">Meta-heuristics</a>
- <a href="#reinforcement-learning-based">Reinforcement Learning-based</a>
  - <a href="#basic-rl">Basic RL</a>
  - <a href="#deep-rl">Deep RL</a>
- <a href="#unassorted">Unassorted</a>

<!-- Template :star:

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**
   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keyworks`: VNFS, VNFP, ILP (Integer Linear Program), Regularization, Rounding
   - `Objective`: Minimize the operating cost and deployment cost
   - `Link`: [paper](https://i.cs.hku.hk/~cwu/papers/zyluo-ton19.pdf)

-->

<!-- more -->


## [Survey papers](#content)

1. **Recent Advances of Resource Allocation in Network Function Virtualization**

   - `Publication`: TPDS 2021 (**CCF-A**)
   - `Authors`: Song Yang, Fan Li, Stojan Trajanovski, Ramin Yahyapour, Xiaoming Fu
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9169857)
   
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

1. **A Survey on the Placement of Virtual Resources and Virtual Network Functions**

   - `Publication`: IEEE Communications Surveys & Tutorials 2019 (**JCR-Q1**)
   - `Authors`: Abdelquoddouss Laghrissi and Tarik Taleb
   - `Link`: [paper](http://mosaic-lab.org/uploads/papers/078b601e-3e01-4a42-8a35-b98e2d113943.pdf)

1. **Resource Allocation in NFV: A Comprehensive Survey**

   - `Publication`: TNSM 2019 (**CCF-C**)
   - `Authors`: Juliver Gil Herrera, Juan Felipe Botero
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/7534741)

1. **A comprehensive survey of network function virtualization**
   - `Publication`: CN 2018 (**CCF-B**)
   - `Authors`: Bo Yi, Xingwei Wang, Keqin Li, Sajal k. Das , Min Huang
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128618300306)


## [Mathematical-based](#content)

## [Heuristic-based](#content)

### [Basic Heuristic](#content)

1. **Energy and Cost Efficient Resource Allocation for Blockchain-Enabled NFV**

    - `Publication`: TSC 2021 (**CCF-B**)
    - `Authors`: Shiva Kazemi Taskou, Mehdi Rasti, Pedro H. J. Nardelli
    - `Keyworks`: VNFP, Blockchain-Enabled, HuRA (Hungarian-based Resource Allocation), HuRA (Hungarian-based Resource Allocation)
    - `Objective`: Minimize the energy consumption and utilized resource cost simultaneously
    - `Link`: [paper](https://arxiv.org/abs/2103.02139)

1. **Towards Latency Optimization in Hybrid Service Function Chain Composition and Embedding**

   - `Publication`: INFOCOM 2020 (**CCF-A**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keyworks`: VNFC & VNFP, HSFCE (Hybrid SFC composition and Embedding), Latency-aware, Betweenness Centrality
   - `Objective`: Minimize the latency for the constructed hybrid SFP
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9155529)

1. **Latency-aware VNF Chain Deployment with Efficient Resource Reuse at Network Edge**

   - `Publication`: INFOCOM 2020 (**CCF-A**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keyworks`: VNFP, MILP (Mixed Integer Iinear Programming), Latency-aware, CDFSA (constrained depth-first search algorithm)
   - `Objective`: Minimize the resource consumption of both servers and links with latency guarantees
   - `Link`: [paper](https://fangmingliu.github.io/files/INFOCOM20-Edge-NFV.pdf)

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keyworks`: VNFP, ILP (Integer Linear Program), Regularization, Rounding
   - `Objective`: Minimize the operating cost and deployment cost
   - `Link`: [paper](https://i.cs.hku.hk/~cwu/papers/zyluo-ton19.pdf)

1. **Reliability-Aware Virtualized Network Function Services Provisioning in Mobile Edge Computing**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Meitian Huang, Weifa Liang, Xiaojun Shen, Yu Ma, Haibin Kan
   - `Keyworks`: VNFP, Reliability-aware, approximation algorithms, DP (dynamic programming), MEC (mobile edge computing)
   - `Objective`:  Maximize the network throughput
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8758846)

1. **Congestion-Aware and Energy-Aware Virtual Network Embedding**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Minh Pham, Doan B. Hoang, Zenon Chaczko
   - `Keyworks`: VNE, relaxed LP (linear Program), Congestion-aware, Energy-aware, SDN (Software-Defined Networks), SR (Segment Routing)
   - `Objective`: Multiple-objective is to save cost, save energy and avoid network congestion simultaneously
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8945162)

1. **Sova: A Software-Defined Autonomic Framework for Virtual Network Allocations**

   - `Publication`: TPDS 2020 (**CCF-A**)
   - `Authors`:  Zhiyong Ye, Yang Wang, Shuibing He, Chengzhong Xu, Xian-He Sun
   - `Keyworks`: VNFP, VNFM, SDN
   - `Objective`: Optimize the network allocation between different services by coordinating virtual dynamic SR-IOV and virtual machine live migration in autonomic way
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9151358)

1. **Optimal Virtual Network Function Deployment for 5G Network Slicing in a Hybrid Cloud Infrastructure**

   - `Publication`: TWC 2020 (**CCF-B**)
   - `Authors`:  Antonio De Domenico, Ya-Feng Liu, Wei Yu
   - `Keyworks`: VNFP, ILP (Integer Linear Programming), Network Slicing
   - `Objective`: Lead to high resource utilization efficiency and large gains in terms of the number of supported VNF chains
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9177288)

1. **Cost-Efficient VNF Placement and Scheduling in Public Cloud Networks**

   - `Publication`: TCOM 2020 (**CCF-B**)
   - `Authors`:  Tao Gao, Xin Li, Yu Wu , Weixia Zou, Shanguo Huang, Massimo Tornatore,  Biswanath Mukherjee
   - `Keyworks`: VNFP, VNFS, Cost Efficiency,  Public Cloud
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9086616)

1. **Virtual Network Embedding With Guaranteed Connectivity Under Multiple Substrate Link Failures**

   - `Publication`: TCOM 2020 (**CCF-B**)
   - `Authors`:  Zhiyong Ye, Yang Wang, Shuibing He, Chengzhong Xu, Xian-He Sun
   - `Keyworks`: VNE, Connectivity, Fault Tolerance, Redundancy
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8906179)

1. **Reliability Aware Service Placement Using a Viterbi-Based Algorithm**

   - `Publication`: TNSM 2020 (**CCF-C**)
   - `Authors`:  Mohammad Karimzadeh-Farshbafan, Vahid Shah-Mansouri, Dusit Niyato
   - `Keyworks`: VNFP, MICP (mixed integer convex programming), Viterbi-based
   - `Objective`: Minimize the cost of resources of the InPs and maximize the reliability of the service
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8933111)

1. **Provably Efficient Algorithms for Placement of Service Function Chains with Ordering Constraints**

   - `Publication`: INFOCOM 2018 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keyworks`: VNFP, Equivalence with Hitting Set, Naive and Faster Greedy, LP-Rounding, DP (Dynamic Programming)
   - `Objective`: Minimize the total deployment cost
   - `Link`: [paper](https://hal.inria.fr/hal-01743273/document)

1. **Toward Profit-Seeking Virtual Network Embedding**

   - `Publication`: INFOCOM 2014 (**CCF-A**)
   - `Authors`: Long Gong, Yonggang Wen, Zuqing Zhu and Tony Lee
   - `Keyworks`: VNE, GRC (Global Resource Control)
   - `Objective`: Maximize the revenue-to-cost ratio and acceptance ratio
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/6847918)

### [Meta-Heuristic](#content)

1. **A Constructive Particle Swarm Optimizer for Virtual Network Embedding**
   - `Publication`: TNSE 2020 (**JCR-Q1**)
   - `Authors`: Yongqiang Gao; Haibing Guan; Zhengwei Qi; Yang Hou; Liang Liu
   - `Keyworks`: VNE, CPSO (Constructive Particle Swarm Optimizer)
   - `Objective`: MinimiziE the cost of bandwidth for embedding the VN
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8786166)
   
1. **A Multi-objective Ant Colony System algorithm for Virtual Machine Placement in Cloud Computing**

   - `Publication`: JCSS 2013 (**CCF-B**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keyworks`: VNFP, ACS (Ant Colony System), Multi-objective
   - `Objective`: Minimize total resource wastage and power consumption
   - `Link`: [IEEE Xplore](https://www.sciencedirect.com/science/article/pii/S0022000013000627)

1. **Virtual Network Embedding through Topology Awareness and Optimization**

   - `Publication`: CN 2012 (**CCF-B**)
   - `Authors`: Xiang Cheng, Sen Su, Zhongbao Zhang, Kai Shuang, Fangchun Yang, Yan Luo, Jie Wang
   - `Keyworks`: VNFP, PSO (Particle Swarm Optimization), Topology decomposition
   - `Objective`: Minimize total resource wastage and power Consumption
   - `Link`: [IEEE Xplore](https://www.researchgate.net/publication/257582253_Virtual_network_embedding_through_topology_awareness_and_optimization)



## [Reinforcement learning-based](#content)

### [Basic RL](#content)

1. **A Dynamic Reliability-Aware Service Placement for Network Function Virtualization (NFV)**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keyworks`: VNFP, Dynamic Reliability-aware, MDP (Markov Deci-
   sion Process), Viterbi algorithm
   - `Objective`: Minimize the placement cost and maximize the number of admitted services
   - `Link`: [paper](https://arxiv.org/abs/1911.06532)

1. **MUVINE: Multi-Stage Virtual Network Embedding in Cloud Data Centers Using Reinforcement Learning-Based Predictions**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Hiren Kumar Thakkar, Chinmaya Dehury, Prasan Kumar Sahoo
   - `Keyworks`: VNE, Q-learning, ML(Machine Learning), Multi-Stage
   - `Objective`: Maximize the server resources utilization and Minimize the number of physical links used
   - `Link`: [paper](http://120.126.16.250/Publication_PDF/journal/j44.pdf)

1. **A Privacy-Preserving Reinforcement Learning Algorithm for Multi-Domain Virtual Network Embedding**

   - `Publication`: TNSM 2020 (**CCF-C**)
   - `Authors`: Davide Andreoletti, Tanya Velichkova, Giacomo Verticale, Massimo Tornatore , Silvia Giordano
   - `Keyworks`: VNE, Multi-domain, Privacy
   - `Objective`: /
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9187205)

1. **Virtual Network Embedding via Monte Carlo Tree Search**
   - `Publication`: IEEE Trans on Cybernetics 2018 (**CCF-B**)
   - `Authors`: Soroush Haeri and Ljiljana Trajkovi´c
   - `Keyworks`: VNE, MCTS (Monte Carlo Tree Search)
   - `Objective`: Maximize the profit of InPs (revenue-to-cost and acceptance ratio)
   - `Link`: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

1. **An Efficient Algorithm for Virtual Network Function Placement and Chaining**
   - `Publication`: CCNC 2017
   - `Authors`: Oussama Soualah, Marouen Mechtri, Chaima Ghribi, Djamal Zeghlache
   - `Keyworks`: VNFP, MCTS (Monte Carlo Tree Search)
   - `Objective`: Maximize the acceptance rate of provisioning requests
   - `Link`: [paper](https://www.researchgate.net/publication/318579373_An_efficient_algorithm_for_virtual_network_function_placement_and_chaining)

<!-- <details><summary> more </summary>  -->


### [Deep RL](#content)

1. **Scalable Orchestration of Service Function Chains in NFV-Enabled Networks ~ A Federated Reinforcement Learning Approach**
   
   - `Publication`: JSAC 2021 (**CCF-A**)
   - `Authors`: Haojun Huang, Cheng Zeng, Yangmin Zhao, Geyong Min, Yingying Zhu, Wang Miao , and Jia Hu
   - `Keyworks`: VNFC, VNFP, DQN, FL (Federated Learning), 
   - `Objective`: Minimize the total weighted cost and  the number of servers to deploy SFCs in NFV-enabled networks
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9468364)

1. **Reliability-aware Dynamic Service Chain Scheduling in 5G Networks based on Reinforcement Learning**
   
   - `Publication`: INFOCOM 2021 (**CCF-A**)
   - `Authors`: Junzhong Jia; Lei Yang; Jiannong Cao
   - `Keyworks`: VNFS, MIIP, Reliability, Redundancy, A3C, TextCNN
   - `Objective`: Decide the redundancy of the VNFs while minimizing delay
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9488707/)

1. **DRL-OR: Deep Reinforcement Learning-based Online Routing for Multi-type Service Requirements**
   
   - `Publication`: INFOCOM 2021 (**CCF-A**)
   - `Authors`: Chenyi Liu; Mingwei Xu; Yuan Yang; Nan Geng
   - `Keyworks`: VNFS, Latency, Multi-agent, PPO
   - `Objective`: Satisfy the requirements of latency sensitive, throughput-sensitive, latency-throughput-sensitive, and latency-loss-sensitive flows at the same time, while exhibiting great adaptiveness and reliability under the scenarios of link failure, traffic change, and partial deployment.
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9488736/)

1. **Automatic Virtual Network Embedding: A Deep Reinforcement Learning Approach With Graph Convolutional Networks**
   
   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keyworks`: VNE, A3C (Asynchronous Advantage Actor-Critic), GCN (Graph Convolutional Network)
   - `Objective`: Minimize the acceptance ratio and long-term average revenue
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/9060910)

1. **Optimal VNF Placement via Deep Reinforcement Learning in SDN/NFV-Enabled Networks**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Jianing Pei, Peilin Hong, Miao Pan, Jiangqing Liu, Jingsong Zhou
   - `Keyworks`: VNFP, DDQN (Double Deep Q Network), BIP (Binary Integer Programming)
   - `Objective`: Minimize the weighted cost consisting of VNF placement cost, penalty of reject SFCRs and VNFI running cost in every time interval $\Delta t$
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8932445)

1. **Intelligent VNF Orchestration and Flow Scheduling via Model-Assisted Deep Reinforcement Learning**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Lin Gu, Deze Zeng, Wei Li, Song Guo, Albert Y. Zomaya, Hai Jin
   - `Keyworks`: VNFS, Latency-awareness, flow, DDPG (Deep Deterministic Policy Gradient)
   - `Objective`: Maximize the overall network utility with the consideration of end-to-end delay and various cost
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8931775)

1. **Virtual Network Function Placement Optimization with Deep Reinforcement Learning**

   - `Publication`: JSAC 2019 (**CCF-A**)
   - `Authors`: Ruben Solozabal, Josu Ceberio, Aitor Sanchoyerto, Luis Zabala, Bego Blanco, Fidel Liberal
   - `Keyworks`: VNFP, PG (Policy Gradient), Seq2Seq (Sequence-to-Sequence)
   - `Objective`: Minimize the overall power consumption
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8945291)

1. **DeepViNE: Virtual Network Embedding with Deep Reinforcement Learning**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Mahdi Dolati, Seyedeh Bahereh Hassanpour, Majid Ghaderi, Ahmad Khonsari
   - `Keyworks`: VNE, DQN (Deep Q Network), Multi-channels Representations
   - `Objective`: Minimize the VN blocking probability
   - `Link`: [paper](https://people.ucalgary.ca/~mghaderi/docs/infocom19-deepvine.pdf)

1. **Multi-domain Non-cooperative VNF-FG Embedding: A Deep Reinforcement Learning Approach**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Pham Tran Anh Quang, Abbas Bradai, Kamal Deep Singh, Yassine Hadjadj-Aoul
   - `Keyworks`: VNFP, DDPG (Deep Deterministic Policy Gradient), Multi-domain, Non-cooperative
   - `Objective`: Maximize the number of allocated VNFs and VLs
   with the lowest cost
   - `Link`: [paper](https://hal.archives-ouvertes.fr/hal-02088819/file/MultiDomain_VNF_FG_embedding__A_Deep_reinforcement_learning_approach-authors%20version.pdf)

1. **Deep Reinforcement Learning based VNF Management in Geo-distributed Edge Computing**

   - `Publication`: ICDCS 2019 (**CCF-B**)
   - `Authors`: Lin Gu, Deze Zeng, Wei Li, Song Guo, Albert Y. Zomaya, Hai Jin
   - `Keyworks`: VNFS, Latency-awareness, flow, DDPG (Deep Deterministic Policy Gradient)
   - `Objective`: Minimize the end-to-end delays and various operation costs
   - `Link`: [IEEE Xplore](https://ieeexplore.ieee.org/document/8885151)

1. **VNE-TD: A virtual network embedding algorithm based on temporal-difference learning**

   - `Publication`: CN 2019 (**CCF-B**)
   - `Authors`: Sen Wang, Jun Bi, Jianping Wu, Athanasios V. Vasilakos, Qilin Fan
   - `Keyworks`: VNFP, TD (Temporal Difference), GRC (Global Resource Control)
   - `Objective`: Maximize the long-term time-average revenue of the InP
   - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S138912861830584X)

1. **NFVdeep: adaptive online service function chain deployment with deep reinforcement learning**

   - `Publication`: IWQoS 2019 (**CCF-B**)
   - `Authors`: Yikai  Xiao, Qixia  Zhang, Fangming Liu, Jia  Wang, Miao  Zhao, Zhongxing  Zhang, Jiaxing  Zhang
   - `Keyworks`: VNFP, PG (Policy Gradient), Serialization and Backtracking, Time Slots
   - `Objective`: Minimize the operation cost of occupied servers and maximize the total throughput of accepted requests
   - `Link`: [paper](https://www.researchgate.net/publication/333789998_NFVdeep_adaptive_online_service_function_chain_deployment_with_deep_reinforcement_learning)


## [Unassorted](#content)

> They will be classified as soon as possible.

1. **Virtual Network Functions Migration Cost: from Identification to Prediction**

    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Rafael de JesusMartins, Cristiano Bonato Both, Juliano Araújo Wickboldt, Lisandro Zambenedett iGranville
    - `Keyworks`: VNFM, Linear regression
    - `Objective`: A novel architecture for orchestrating and enforcing multi-domain SFCs
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S138912862031118X)

1. **On cross-domain Service Function Chain orchestration: An architectural framework**
    - `Publication`: CN 2021 (**CCF-B**)
    - `Authors`: Nassima Toumi, Olivier Bernier, Djamal-Eddine Meddour, Adlen Ksentini
    - `Keyworks`: VNFC & VNFP, Multi-domain
    - `Objective`: A novel architecture for orchestrating and enforcing multi-domain SFCs
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128621000013)
    
1. **pSMART: A lightweight, privacy-aware service function chain orchestration in multi-domain NFV/SDN**
   
    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Kalpana D. Joshi , Kotaro Kataoka
    - `Keyworks`: VNFC, Multi-domain, Privacy
    - `Objective`: Utilize less sensitive information, to reduce privacy and security risks
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128619311181)
    
1. **End-to-end network slicing for future wireless in multi-region cloud platforms**
    - `Publication`: CN 2020 (**CCF-B**)
    - `Authors`: Simona Marinova , Thomas Lin, Hadi Bannazadeh, Alberto Leon-Garcia
    - `Keyworks`: VNFC & VNFP, Multi-domain, E2E (End-to-end) network slicing
    - `Objective`: /
    - `Link`: [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389128619316081)