本示例是根据IBM提供的Marbles项目，具体分析如何基于Hyperledger Fabric利用fabric-sdk-node实现一个web应用

首先我们先来看一下应用程序的实际运行效果：

![example](./md/img/example.gif)

此应用程序将演示如何利用 Hyperledger Fabric 在许多Marble所有者之间转移Marble。 我们将在 Node.js 中使用一些 GoLang 代码完成此任务。 该应用程序的后端将在Hyperledger Fabric网络中运行的 GoLang 代码。 这些 GoLang 代码将称为“链代码”或“cc”。 该链代码本身会创建一个Marble，并将其存储到链代码状态中。 该链代码本身可以将数据作为字符串存储在键/值对设置中。 因此，需要将字符串转化成为 JSON 对象，以便于在账本中存储更复杂的数据结构。

具体实现过程参见如下文档内容：

1. [网络环境搭建](https://github.com/kevin-hf/kevin-marbles/blob/master/md/1.%20网络环境搭建.md)
2. [编写链码](https://github.com/kevin-hf/kevin-marbles/blob/master/md/2.%20%E7%BC%96%E5%86%99%E9%93%BE%E7%A0%81.md)
3. [设置环境－网络连接信息](https://github.com/kevin-hf/kevin-marbles/blob/master/md/3.%20%E8%AE%BE%E7%BD%AE%E7%8E%AF%E5%A2%83-%E7%BD%91%E7%BB%9C%E8%BF%9E%E6%8E%A5%E4%BF%A1%E6%81%AF.md)
4. [设置环境－连接概要库](https://github.com/kevin-hf/kevin-marbles/blob/master/md/4.%20%E8%AE%BE%E7%BD%AE%E7%8E%AF%E5%A2%83-%E8%BF%9E%E6%8E%A5%E6%A6%82%E8%A6%81%E5%BA%93.md)
5. [设置环境－连接概要库入口](https://github.com/kevin-hf/kevin-marbles/blob/master/md/5.%20%E8%AE%BE%E7%BD%AE%E7%8E%AF%E5%A2%83-%E8%BF%9E%E6%8E%A5%E6%A6%82%E8%A6%81%E5%BA%93%E5%85%A5%E5%8F%A3.md)
6. [sdk-node之链码安装及实例化](https://github.com/kevin-hf/kevin-marbles/blob/master/md/6.%20sdk-node%E4%B9%8B%E9%93%BE%E7%A0%81%E5%AE%89%E8%A3%85%E5%8F%8A%E5%AE%9E%E4%BE%8B%E5%8C%96.md)
7. [调用链码安装及实例化脚本](https://github.com/kevin-hf/kevin-marbles/blob/master/md/7.%20%E8%B0%83%E7%94%A8%E9%93%BE%E7%A0%81%E5%AE%89%E8%A3%85%E5%8F%8A%E5%AE%9E%E4%BE%8B%E5%8C%96%E8%84%9A%E6%9C%AC.md)
8. [测试](https://github.com/kevin-hf/kevin-marbles/blob/master/md/8.%20%E6%B5%8B%E8%AF%95.md)
9. [sdk-node之实现事务与查询](https://github.com/kevin-hf/kevin-marbles/blob/master/md/9.%20sdk-node%E4%B9%8B%E5%AE%9E%E7%8E%B0%E4%BA%8B%E5%8A%A1%E4%B8%8E%E6%9F%A5%E8%AF%A2.md)
10. [调用链码实现事务与查询脚本](https://github.com/kevin-hf/kevin-marbles/blob/master/md/10.%20%E8%B0%83%E7%94%A8%E9%93%BE%E7%A0%81%E5%AE%9E%E7%8E%B0%E4%BA%8B%E5%8A%A1%E5%8F%8A%E6%9F%A5%E8%AF%A2%E8%84%9A%E6%9C%AC.md)
11. [服务器端脚本](https://github.com/kevin-hf/kevin-marbles/blob/master/md/11.%20%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E8%84%9A%E6%9C%AC.md)
12. [web实现](https://github.com/kevin-hf/kevin-marbles/blob/master/md/12.%20web%E5%AE%9E%E7%8E%B0.md)
13. [启动web应用](https://github.com/kevin-hf/kevin-marbles/blob/master/md/13.%20%E5%90%AF%E5%8A%A8Web%E5%BA%94%E7%94%A8.md)
14. [交互演示](https://github.com/kevin-hf/kevin-marbles/blob/master/md/14.%20%E4%BA%A4%E4%BA%92%E6%BC%94%E7%A4%BA.md)

