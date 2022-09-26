import { CircleNode, CircleNodeModel, h } from "@logicflow/core"

class BoundaryEventModel extends CircleNodeModel {
  getNodeStyle () {
    const style = super.getNodeStyle()
    style.strokeWidth = 1
    style.stroke = '#EFEA9A'
    return style
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle()
    style.stroke = 'transparent'
    style.hover.stroke = 'transparent'
    return style
  }
  initNodeData (data) {
    super.initNodeData(data)
    this.r = 20
    this.zIndex = 9999
  }
}

class BoundaryEvent extends CircleNode {
  getShape() {
    const { model } = this.props;
    const style = model.getNodeStyle();
    const { x, y, r, width, height } = model;
    const outCircle = super.getShape();
    return h(
      'g',
      {},
      outCircle,
      h('circle', {
        ...style,
        cx: x,
        cy: y,
        r: r - 5,
      }),
      h(
        'svg',
        {
          x: x - width / 2 + 2,
          y: y - height / 2 + 2,
        },
        h('path', {
          stroke: style.stroke,
          fill: style.fill,
          d: 'M 10.5,8.5 l 14.5,0 l 0,18 l -14.5,0 Z M 12.5,11.5 l 10.5,0 M 12.5,14.5 l 10.5,0 M 12.5,17.5 l 10.5,0 M 12.5,20.5 l 10.5,0 M 12.5,23.5 l 10.5,0 M 12.5,26.5 l 10.5,0',
        }),
      )
    );
  }
  toFront () {
    
  }
}

export default {
  type: "boundary-event",
  view: BoundaryEvent,
  model: BoundaryEventModel,
}
