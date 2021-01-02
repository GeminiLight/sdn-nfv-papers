# Papers on NFV

This is a paper list about [Network Functions Virtualization](https://en.wikipedia.org/wiki/Network_function_virtualization) (NFV) including:

- Comprehensive **Surveys**
- **VNE**: Virtual Network Embedding
- **VNFC**: Virtual Network Function Chain Algorithms  
- **VNFP**: Virtual Network Function Placement Algorithms  
- **VNFS**: Virtual Network Function Scheduling Algorithms  

Particularly, papers related with resource allocation are classified according to method categories.

Favorably receive that submit relevant papers to this repository in the appropriate format.

## [Content](#content)

- <a href="#survey-papers">Survey</a>
- <a href="#mathematical-based">Mathematical-based</a>
- <a href="#heuristic-based">Heuristic-based</a>
  - <a href="#basic-heruistics">Basic heruistics</a>
  - <a href="#meta-heruistics">Meta-heruistics</a>
- <a href="#reinforcement-learning-based">Reinforcement Learning-based</a>
  - <a href="#basic-rl">Basic RL</a>
  - <a href="#value-based-drl">Value-based DRL</a>
  - <a href="#policy-based-drl">Policy-based DRL</a>

<!-- Template

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
   - `Link`: [paper](https://ieeexplore.ieee.org/document/9169857)(To IEEE explore)

1. **NFV Platform Design: A Survey**

   - `Publication`: TNSM 2020 (**CCF-C**)
   - `Authors`: Tianzhu Zhang
   - `Link`: [paper](https://arxiv.org/abs/2002.11059)(To IEEE explore)

1. **A Survey on the Placement of Virtual Resources and Virtual Network Functions**

   - `Publication`: IEEE Communications Surveys & Tutorials 2019 (**JCR-Q1**)
   - `Authors`: Abdelquoddouss Laghrissi and Tarik Taleb
   - `Link`: [paper](http://mosaic-lab.org/uploads/papers/078b601e-3e01-4a42-8a35-b98e2d113943.pdf)

1. **Resource Allocation in NFV: A Comprehensive Survey**

   - `Publication`: TNSM 2019 (**CCF-C**)
   - `Authors`: Juliver Gil Herrera, Juan Felipe Botero
   - `Link`: [paper](https://ieeexplore.ieee.org/document/7534741)(To IEEE explore)

1. **A comprehensive survey of network function virtualization**

   - `Publication`: CN 2018 (**CCF-B**)
   - `Authors`: Bo Yi, Xingwei Wang, Keqin Li, Sajal k. Das , Min Huang
   - `Link`: [paper](https://www.sciencedirect.com/science/article/abs/pii/S1389128618300306)(To ScienceDirect)

## [Mathematical-based](#content)

## [Heuristic-based](#content)

### [Based Heuristic](#content)

1. **Latency-aware VNF Chain Deployment with Efficient Resource Reuse at Network Edge**

   - `Publication`: INFOCOM 2020 (**CCF-A**)
   - `Authors`: Panpan Jin; Xincai Fei; Qixia Zhang; Fangming Liu; Bo Li
   - `Keyworks`: VNFP, MILP (Mixed Integer Iinear Programming), Latency-aware, CDFSA (constrained depth-first search algorithm)
   - `Objective`: Minimize the resource consumption of both servers and links with latency guarantees
   - `Link`: [paper](https://fangmingliu.github.io/files/INFOCOM20-Edge-NFV.pdf)

1. **An Online Algorithm for VNF Service Chain Scaling in Datacenters**

   - `Publication`: TON 2020 (**CCF-A**)
   - `Authors`: Ziyue Luo, Chuan Wu
   - `Keyworks`: VNFS, VNFP, ILP (Integer Linear Program), Regularization, Rounding
   - `Objective`: Minimize the operating cost and deployment cost
   - `Link`: [paper](https://i.cs.hku.hk/~cwu/papers/zyluo-ton19.pdf)
Reliability Aware Service Placement Using a Viterbi-Based Algorithm

1. **Reliability Aware Service Placement Using a Viterbi-Based Algorithm**

   - `Publication`: TNSM 2020 (**CCF-C**)
   - `Authors`:  Mohammad Karimzadeh-Farshbafan, Vahid Shah-Mansouri, Dusit Niyato
   - `Keyworks`: VNFP, MICP (mixed integer convex programming), Viterbi-based
   - `Objective`: Minimize the cost of resources of the InPs and maximizing the reliability of the service
   - `Link`: [paper](https://ieeexplore.ieee.org/document/8933111)

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
   - `Link`: [paper](https://ieeexplore.ieee.org/document/6847918)(To IEEE Explore)

### [Meta-Heuristic](#content)

## [Reinforcement learning-based](#content)

### [Basic RL](#content)

1. **A Dynamic Reliability-Aware Service Placement for Network Function Virtualization (NFV)**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keyworks`: VNFP, Dynamic Reliability-aware, MDP (Markov Deci-
sion Process), Viterbi algorithm
   - `Objective`: Minimize the placement cost and maximize the number of admitted services
   - `Link`: [paper](https://arxiv.org/abs/1911.06532)(To arXiv)

1. **MUVINE: Multi-Stage Virtual Network Embedding in Cloud Data Centers Using Reinforcement Learning-Based Predictions**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Hiren Kumar Thakkar, Chinmaya Dehury, Prasan Kumar Sahoo
   - `Keyworks`: VNE, Q-learning, ML(Machine Learning), Multi-Stage
   - `Objective`: Maximize the server resources utilization and minimizing the number of physical links used
   - `Link`: [paper](http://120.126.16.250/Publication_PDF/journal/j44.pdf)

1. **Virtual Network Embedding via Monte Carlo Tree Search**

   - `Publication`: IEEE Trans on Cybernetics 2018 (**CCF-B**)
   - `Authors`: Soroush Haeri and Ljiljana Trajkovi´c
   - `Keyworks`: VNE, MCTS (Monte Carlo Tree Search)
   - `Objective`: Maximize the profit of InPs (revenue-to-cost and acceptance ratio)
   - `Link`: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

1. **An efficient algorithm for virtual network function placement and chaining**

   - `Publication`: CCNC 2017
   - `Authors`: Oussama Soualah, Marouen Mechtri, Chaima Ghribi, Djamal Zeghlache
   - `Keyworks`: VNFP, MCTS (Monte Carlo Tree Search)
   - `Objective`: Maximize the acceptance rate of provisioning requests
   - `Link`: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

<!-- <details><summary> more </summary>  -->

### [Value-based DRL](#content)

1. **Optimal VNF Placement via Deep Reinforcement Learning in SDN/NFV-Enabled Networks**

   - `Publication`: JSAC 2019 (**CCF-A**)
   - `Authors`: Jianing Pei, Peilin Hong, Miao Pan, Jiangqing Liu, Jingsong Zhou
   - `Keyworks`: VNFP, DDQN (Double Deep Q Network), BIP (Binary Integer Programming)
   - `Link`: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

1. **DeepViNE: Virtual Network Embedding with Deep Reinforcement Learning**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Mahdi Dolati, Seyedeh Bahereh Hassanpour, Majid Ghaderi, Ahmad Khonsari
   - `Keyworks`: VNE, DQN (Deep Q Network), Multi-channels Representations
   - `Objective`: Minimize the VN blocking probability
   - `Link`: [paper](https://people.ucalgary.ca/~mghaderi/docs/infocom19-deepvine.pdf)

### [Policy-based DRL](#content)

1. **Automatic Virtual Network Embedding: A Deep Reinforcement Learning Approach With Graph Convolutional Networks**

   - `Publication`: JSAC 2020 (**CCF-A**)
   - `Authors`: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - `Keyworks`: VNE, A3C (Asynchronous Advantage Actor-Critic), GCN (Graph Convolutional Network)
   - `Objective`: Minimizing the acceptance ratio and long-term average revenue
   - `Link`: [paper](https://ieeexplore.ieee.org/document/9060910)(To IEEE explore)

1. **Virtual Network Function Placement Optimization With Deep Reinforcement Learning**

   - `Publication`: JSAC 2019 (**CCF-A**)
   - `Authors`: Ruben Solozabal, Josu Ceberio, Aitor Sanchoyerto, Luis Zabala, Bego Blanco, Fidel Liberal
   - `Keyworks`: VNFP, PG (Policy Gradient), Seq2Seq (Sequence-to-Sequence)
   - `Objective`: Minimize the overall power consumption
   - `Link`: [paper](https://ieeexplore.ieee.org/document/8945291)(To IEEE explore)

1. **Multi-domain Non-cooperative VNF-FG Embedding: A Deep Reinforcement Learning Approach**

   - `Publication`: INFOCOM 2019 (**CCF-A**)
   - `Authors`: Pham Tran Anh Quang, Abbas Bradai, Kamal Deep Singh, Yassine Hadjadj-Aoul
   - `Keyworks`: VNFP, DDPG (Deep Deterministic Policy Gradient), Multi-domain Non-cooperative
   - `Objective`: Maximize the number of allocated VNFs and VLs
with the lowest cost
   - `Link`: [paper](https://hal.archives-ouvertes.fr/hal-02088819/file/MultiDomain_VNF_FG_embedding__A_Deep_reinforcement_learning_approach-authors%20version.pdf)

1. **VNE-TD: A virtual network emb e dding algorithm based on temporal-difference learning**

   - `Publication`: CN 2019 (**CCF-B**)
   - `Authors`: Sen Wang, Jun Bi, Jianping Wu, Athanasios V. Vasilakos, Qilin Fan
   - `Keyworks`: VNFP, TD (Temporal Difference), GRC (Global Resource Control)
   - `Objective`: Maximize the long-term time-average revenue of the InP
   - `Link`: [paper](https://www.sciencedirect.com/science/article/abs/pii/S138912861830584X)(To ScienceDirect)

1. **NFVdeep: adaptive online service function chain deployment with deep reinforcement learning**

   - `Publication`: IWQoS 2019 (**CCF-B**)
   - `Authors`: Yikai  Xiao, Qixia  Zhang, Fangming Liu, Jia  Wang, Miao  Zhao, Zhongxing  Zhang, Jiaxing  Zhang
   - `Keyworks`: VNFP, PG (Policy Gradient), Serialization and Backtracking, Time Slots
   - `Objective`: Minimize the operation cost of occupied servers and maximize the total throughput of accepted requests
   - `Link`: [paper](https://www.researchgate.net/publication/333789998_NFVdeep_adaptive_online_service_function_chain_deployment_with_deep_reinforcement_learning)
