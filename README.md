# Papers On VNE, SFCD and VNFP

Lastest update: Dec. 01, 2020.

Contributed by Gemini Light(Tianfu Wang).

| Acronym | Meaning |
| :---:| --- |
VNE | Virtual Network Embedding
SFCD | Service Function Chain Deployment
VNFP | Virtual Network Function Placement  

## [Content](#content)

<table>
<tr><td colspan="2"><a href="#survey-papers">1. Survey</a></td></tr>
<tr><td colspan="2"><a href="#mathematical-optimization-based">2. Mathematical optimization-based</a></td></tr>
<tr><td colspan="2"><a href="#heuristic-based">3. Heuristic-based</a></td></tr>
<tr><td colspan="2"><a href="#nature-heuristic-based">4. Nature Heuristic-based</a></td></tr>
<tr><td colspan="2"><a href="#reinforcement-learning-based">5. Reinforcement learning-based</a></td></tr>
<tr>
    <td>&emsp;<a href="#basic-rl">5.1 Basic RL</a></td>
    <td>&ensp;<a href="#value-based-drl">5.2 Value-based DRL</a></td>
</tr>
<tr>
    <td>&emsp;<a href="#policy-based-drl">5.3 Policy-based DRL</a></td>
    <td>&emsp;<a href="#"></a></td>
</tr>
</table>

<!-- more -->

## [Survey papers](#content)

1. **Recent Advances of Resource Allocation in Network Function Virtualization**

   - Publication: TPDS 2021 (CCF-A)
   - Author: Song Yang, Fan Li, Stojan Trajanovski, Ramin Yahyapour, Xiaoming Fu
   - Keyworks: /
   - Link: [paper](https://ieeexplore.ieee.org/document/9169857)(To IEEE explore)

1. **A Survey on the Placement of Virtual Resources and Virtual Network Functions**

   - Publication: IEEE Communications Surveys & Tutorials 2019 (Q1)
   - Author: Abdelquoddouss Laghrissi and Tarik Taleb
   - Keyworks: /
   - Link: [paper](http://mosaic-lab.org/uploads/papers/078b601e-3e01-4a42-8a35-b98e2d113943.pdf)

## [Mathematical optimization-based](#content)

## [Heuristic-based](#content)

1. **Toward Profit-Seeking Virtual Network Embedding**

   - Publication: INFOCOM 2014 (CCF-A)
   - Author: Long Gong, Yonggang Wen, Zuqing Zhu and Tony Lee
   - Keyworks: VNE, GRC (Global Resource Control)
   - Link: [paper](https://ieeexplore.ieee.org/document/6847918)

## [Nature Heuristic-based](#content)

## [Reinforcement learning-based](#content)

### [Basic RL](#content)

1. **MUVINE: Multi-Stage Virtual Network Embedding in Cloud Data Centers Using Reinforcement Learning-Based Predictions**

   - Publication: JSAC 2020 (CCF-A)
   - Author: Hiren Kumar Thakkar, Chinmaya Dehury, Prasan Kumar Sahoo
   - Keyworks: VNE, Q-learning, ML(Machine Learning), Multi-Stage
   - Objective: Maximizing the server resources utilization and minimizing the number of physical links used
   - Link: [paper](http://120.126.16.250/Publication_PDF/journal/j44.pdf)

2. **Virtual Network Embedding via Monte Carlo Tree Search**

   - Publication: IEEE Trans on Cybernetics 2018 (CCF-B)
   - Author: Soroush Haeri and Ljiljana Trajkovi´c
   - Keyworks: VNE, MCTS (Monte Carlo Tree Search)
   - Link: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

<!-- <details><summary> more </summary>  -->

### [Value-based DRL](#content)

1. **Optimal VNF Placement via Deep Reinforcement Learning in SDN/NFV-Enabled Networks**

   - Publication: JSAC 2019 (CCF-A)
   - Author: Jianing Pei, Peilin Hong, Miao Pan, Jiangqing Liu, Jingsong Zhou
   - Keyworks: VNFP, DDQN (Double Deep Q Network), BIP (Binary Integer Programming)
   - Link: [paper](https://www.researchgate.net/publication/313873926_Virtual_Network_Embedding_via_Monte_Carlo_Tree_Search)

1. **DeepViNE: Virtual Network Embedding with Deep Reinforcement Learning**

   - Publication: INFOCOM 2019 (CCF-A)
   - Author: Mahdi Dolati, Seyedeh Bahereh Hassanpour, Majid Ghaderi, Ahmad Khonsari
   - Keyworks: VNE, DQN (Deep Q Network), Multi-channels Representations
   - Objective: Minimize the VN blocking probability
   - Link: [paper](https://people.ucalgary.ca/~mghaderi/docs/infocom19-deepvine.pdf)

### [Policy-based DRL](#content)

1. **Automatic Virtual Network Embedding: A Deep Reinforcement Learning Approach With Graph Convolutional Networks**

   - Publication: JSAC 2020 (CCF-A)
   - Author: Zhongxia Yan, Jingguo Ge, Yulei Wu, Liangxiong Li, Tong Li
   - Keyworks: VNE, A3C (Asynchronous Advantage Actor-Critic), GCN (Graph Convolutional Network)
   - Objective: Minimizing the acceptance ratio and long-term average revenue
   - Link: [paper](https://ieeexplore.ieee.org/document/9060910)(To IEEE explore)

2. **Virtual Network Function Placement Optimization With Deep Reinforcement Learning**

   - Publication: JSAC 2019 (CCF-A)
   - Author: Ruben Solozabal, Josu Ceberio, Aitor Sanchoyerto, Luis Zabala, Bego Blanco, Fidel Liberal
   - Keyworks: VNFP, PG (Policy Gradient), Seq2Seq (Sequence-to-Sequence)
   - Objective: Minimizing the overall power consumption
   - Link: [paper](https://ieeexplore.ieee.org/document/8945291)(To IEEE explore)

3. **Multi-domain Non-cooperative VNF-FG Embedding: A Deep Reinforcement Learning Approach**

   - Publication: INFOCOM 2019 (CCF-A)
   - Author: Pham Tran Anh Quang, Abbas Bradai, Kamal Deep Singh, Yassine Hadjadj-Aoul
   - Keyworks: VNF-FG, DDPG (Deep Deterministic Policy Gradient), Multi-domain Non-cooperative
   - Objective: Maximize the number of allocated VNFs and VLs
with the lowest cost
   - Link: [paper](https://hal.archives-ouvertes.fr/hal-02088819/file/MultiDomain_VNF_FG_embedding__A_Deep_reinforcement_learning_approach-authors%20version.pdf)
