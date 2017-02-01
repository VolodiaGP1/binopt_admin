import React, {Component, PropTypes} from 'react'
import transitions from 'material-ui/styles/transitions'
import CodeBlockTitle from './CodeBlockTitle'

const styles = {
  root: {
    background: '#f8f8f8',
    borderTop: 'solid 1px #e0e0e0'
  },
  markdown: {
    overflow: 'auto',
    maxHeight: 1400,
    transition: transitions.create('max-height', '800ms', '0ms', 'ease-in-out'),
    marginTop: 0,
    marginBottom: 0
  },
  markdownRetracted: {
    maxHeight: 0
  },
  description: {
    background: '#ffffff',
    overflow: 'auto',
    padding: '10px 20px 0',
    marginTop: 0,
    marginBottom: 0
  },
  codeBlockTitle: {
    cursor: 'pointer'
  }
}

class CodeBlock extends Component {
  static propTypes = {
    children: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    buttons: PropTypes.object,
    className: PropTypes.string
  };

  state = {
    expand: false
  };

  handleTouchTap = () => {
    this.setState({
      expand: !this.state.expand
    })
  };

  render () {
    let tooltip = 'Show source'

    if (this.state.expand) {
      tooltip = 'Hide source'
    }

    return (
      <div style={styles.root} className={this.props.className}>
        <div style={styles.codeBlockTitle}>
          <CodeBlockTitle title={this.props.title} tooltip={tooltip} buttons={this.props.buttons} />
        </div>
      </div>
    )
  }
}

export default CodeBlock
