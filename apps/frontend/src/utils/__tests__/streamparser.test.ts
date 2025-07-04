import { JSONParser } from '@streamparser/json';

describe('streamparser', () => {
  it('should parse a valid JSON string', () => {
    const parser = new JSONParser({
      paths: ['$.nodes.*'], // Parse individual nodes in the array
    });

    parser.onValue = ({ value }) => {
        console.log("####################### value ##########")
    console.log(value);
    };

    parser.write(`{
  "centerNode": "无聊",
  "nodes": [
    {
      "nodeName": "创造力的潜伏期",
      "connection": "无聊作为大脑的默认模式网络激活状态，为创意洞察创造条件",

  `)

  parser.write(`
      "insight": "无聊不是创造力的敌人，而是其必要的孕育期。大脑在看似无所事事时实际进行着最深层的模式识别和概念重组",
      "explorationMethods": ["逆向逻辑路径", "负空间探索"],
      "references": [
        "默认模式网络与创造性思维的神经科学研究",
        "《无聊的创造力》- Teresa Belton研究"
      ]
    },
    {
      "nodeName": "时间感知的扭曲器",
      "connection": "无聊改变我们对时间流逝的主观体验，揭示意识的时间建构机制",
      "insight": "无聊是时间意识的放大镜，它暴露了时间体验的主观性质。在无聊中，时间变得可见且可塑，为理解意识的时间性提供了独特窗口",
      "explorationMethods": ["时间位移路径", "多尺度共振"],
      "references": [
        "现象学的时间意识分析",
        "认知心理学中的时间知觉研究"
      ]
    },`);

    
  });
});
