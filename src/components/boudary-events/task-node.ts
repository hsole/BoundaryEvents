import { RectNode, RectNodeModel, h } from '@logicflow/core'

class TaskModel extends RectNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    const { isCloseToBoundary } = this.properties
    if (isCloseToBoundary) {
      style.stroke = '#FF0000'
      style.strokeWidth = 2
    } else {
      style.stroke = '#EFEA9A'
      style.strokeWidth = 1
    }
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
    this.width = 100
    this.height = 60
    this.isTaskNode = true
    this.boundaryEvents = []
  }
  setIsCloseToBoundary (flag) {
    this.setProperty('isCloseToBoundary', flag)
  }
  addBoundaryEvent (nodeId) {
    if (this.boundaryEvents.find(item => item === nodeId)) {
      return false
    }
    this.boundaryEvents.push(nodeId)
    return true
  }
  deleteBoundaryEvent (nodeId) {
    this.boundaryEvents = this.boundaryEvents.filter(item => item !== nodeId)
  }
}

class Task extends RectNode {
  getShape() {
    const { model } = this.props;
    const style = model.getNodeStyle();
    const { x, y, width, height } = model;
    const outCircle = super.getShape();
    return h(
      'g',
      {},
      outCircle,
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
      }),
    );
  }
}

export default {
  type: 'task-node',
  view: Task,
  model: TaskModel,
}
