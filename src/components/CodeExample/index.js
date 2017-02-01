import React, {Component, PropTypes} from 'react'
import CodeBlock from './CodeBlock'
import ClearFix from 'material-ui/internal/ClearFix'
import Paper from 'material-ui/Paper'

class CodeExample extends Component {
  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string,
    component: PropTypes.bool,
    description: PropTypes.string,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
    buttons: PropTypes.object,
    contentClassName: PropTypes.string,
    codeClassName: PropTypes.string,
    contentStyles: PropTypes.object
  };

  static defaultProps = {
    component: true
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  render () {
    const {
      children,
      code,
      layoutSideBySide
    } = this.props

    const palette = this.context.muiTheme.rawTheme.palette
    const canvasColor = palette.canvasColor

    const styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null
      }
    }

    const docs = {}

    return (
      <Paper style={styles.root}>
        <CodeBlock
          title={this.props.title}
          description={this.props.description || docs.description}
          buttons={this.props.buttons}
          className={this.props.codeClassName}
        >
          {code}
        </CodeBlock>
        <ClearFix className={this.props.contentClassName} style={this.props.contentStyles}>{children}</ClearFix>
      </Paper>
    )
  }
}

export default CodeExample
