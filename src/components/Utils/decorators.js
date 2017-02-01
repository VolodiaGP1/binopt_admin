import React from 'react'
import {VelocityComponent} from 'velocity-react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

const Loading = (props) => {
  return (
    <div style={props.style}>
      завантаження...
    </div>
  )
}

Loading.propTypes = {
  style: React.PropTypes.object
}

const Toggle = (props) => {
  const style = props.style
  const onClickFunc = props.onClick
  const height = style.height
  const width = style.width
  let midHeight = height * 0.5
  let points = `0,0 0,${height} ${width},${midHeight}`
  return (
    <div onClick={onClickFunc} style={style.base} className='tree-toggle'>
      <div style={style.wrapper}>
        <svg height={height} width={width}>
          <polygon
            points={points}
            style={style.arrow}
          />
        </svg>
      </div>
    </div>
  )
}

Toggle.propTypes = {
  style: React.PropTypes.object,
  onClick: React.PropTypes.func
}

const Header = (props) => {
  // const style = props.style
  return (
    <div>
      <ListItem
        className='tree-node'
        leftAvatar={<Avatar icon={<FileFolder />} />} rightIconButton={
          <div>
            <RaisedButton label='Редагувати' icon={<FontIcon className='material-icons'>mode_edit</FontIcon>} />
          </div>
        }
        primaryText={props.node.name}
        secondaryText=''
      />
      <Divider style={{margin: 0}} />

    </div>
  )
}

Header.propTypes = {
  style: React.PropTypes.object,
  node: React.PropTypes.object.isRequired
}

class Container extends React.Component {
  render () {
    const {style, decorators, terminal, onClick, node} = this.props
    return (
      <div
        className='tree'
        ref='clickable'
        style={style.container}>
        { !terminal ? this.renderToggle(onClick) : null }
        <decorators.Header
          node={node}
          style={style.header}
        />
      </div>
    )
  }
  renderToggle (onClick) {
    const animations = this.props.animations
    if (!animations) { return this.renderToggleDecorator() }
    return (
      <VelocityComponent ref='velocity'
        duration={animations.toggle.duration}
        animation={animations.toggle.animation}>
        {this.renderToggleDecorator(onClick)}
      </VelocityComponent>
    )
  }
  renderToggleDecorator (onClick) {
    const {style, decorators} = this.props
    return (<decorators.Toggle onClick={onClick} style={style.toggle} />)
  }
}

Container.propTypes = {
  style: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object.isRequired,
  terminal: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  animations: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]).isRequired,
  node: React.PropTypes.object.isRequired
}

export default {
  Loading,
  Toggle,
  Header,
  Container
}
