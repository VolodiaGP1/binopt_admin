import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'
import agent from '../../agent'

const style = {
  marginTop: 10,
  marginBottom: 10
}

/**
 * File for downloading files on server
 * Example of calling :
 * <ImageUploader
 *        entityName='Import\Promotions\PromotionImages' // Entity name, we work with
 *        alt={'image'}                                  // Alt of image
 *        tableRow={tableRowID}                          // ID of row to input our record
 *        parentIdValue={banner.id}                      // Value of parent column
 *        directoryName='/img/banners/'                  // Directory where we should save our images
 *        order='1'                                      // Order field
 *        previewBlockIdName='preview-block'             // Name of div, where we should see preview (dom-element)
 *        onChange={(a, b) => this.onDrop(b)}            // Function, which return props, when something uploaded
 * />
 */
export class ImageUploader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: null,                                  // Files of images to upload
      preview: null,                                // Preview of image (string - href)
      generatedFileName: null                       // Generated file name
    }
  };

  /**
   * Default properties of class
   *
   * @type {{previewBlockClassName: *, apiURL: (module.exports.isRequired|Function|*)}}
   */
  static propTypes = {
    previewBlockIdName: PropTypes.string,           // Name of block for preview to be outputed
    onChange: PropTypes.func,                       // Returns file name, file
    generateName: PropTypes.bool,                   // Check if we should generate random name
    tableRow: PropTypes.oneOfType([                 // ID of row, where we should write name
      PropTypes.string,
      PropTypes.number
    ]),
    parentIdValue: PropTypes.oneOfType([            // Value of parent column
      PropTypes.string,
      PropTypes.number
    ]),
    agentName: PropTypes.string,                    // Name of agent to rule the API
    directoryName: PropTypes.string,                // Name of directory to save images to
    entityName: PropTypes.string,                   // Name of entity to work with
    alt: PropTypes.oneOfType([                      // Alt of image
      PropTypes.string,
      PropTypes.number
    ]),
    order: PropTypes.oneOfType([                    // Order field
      PropTypes.string,
      PropTypes.number
    ]),
    onSave: PropTypes.func                          // On saving file
  };

  /**
   * Set default value of props
   *
   * @type {{generateName: boolean}}
   */
  static defaultProps = {
    generateName: false
  };

  /**
   * Function used to generate new file name
   */
  generateFileName () {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    this.setState({generatedFileName: text})
  };

  /**
   * Set file as state, and set preview of the image
   * Render element for preview
   *
   * @param file - file wich was added to dropzone
   */
  onDrop (file) {
    this.generateFileName()
    this.setState({files: file[0], preview: file[0].preview}, () => {
      ReactDOM.render(<ImageUploaderPreview preview={this.state.preview} />,
          document.getElementById(this.props.previewBlockIdName))
    })
    this.props.onChange(file.name, file)
  };

  /**
   * Saving picture on server
   */
  savePicture () {
    var data = new FormData()
    var directory
    var entityName = this.props.entityName
    var alt = this.props.alt
    var order = this.props.order
    var parentIdValue = this.props.parentIdValue
    var rowID = this.props.tableRow
    var file = this.state.files

    if (!file) {
      return true
    }

    directory = entityName.substring(entityName.lastIndexOf('\\') + 1)

    var params = {
      'name': file.name,
      'type': file.type,
      'size': file.size,
      'record_id': parentIdValue,
      'directory': directory,
      'alt': alt,
      'order': order,
      'entity': entityName
    }
    var paramValues = ''

    for (var key in params) {
      if (params[key] !== null) {
        if (paramValues !== '') {
          paramValues += '&'
        }
        paramValues += key + '=' + encodeURIComponent(params[key])
      }
    }
    if (rowID) {
      paramValues += '&'
      paramValues += 'id' + '=' + encodeURIComponent(rowID)
    }

    /**
     * Props, that we return back to the parent
     * Name of the file (fileName), files which were uploaded (files), generated name of the file (generatedName)
     */
    var fileName = this.state.files.name
    var files = this.state.files
    let imageHref

    data.append('file', this.state.files)
    /**
     * Sending picture via post, to the '../public/img'
     */
    agent.Files.post(`mapper=FilesMapper&directory=${directory}`, data).then(response => {})
    /**
     * Setting field of picture of current table according to the file, which was uploaded
     */
    if (rowID) {
      agent.Images.put(`${paramValues}`).then(response => {
      })
    } else {
      agent.Images.post(`${paramValues}`).then(response => {
        imageHref = response.data.images.image_path
        this.props.onChange(fileName, files, imageHref)
        this.props.onSave(true)
      })
      return true
    }
    /**
     *  Return props back to parent
     */
    this.props.onChange(fileName, files, imageHref)
    this.props.onSave(true)
  }

  /**
   * Render image uplaoder
   */
  render () {
    return (
      <div>
        <div>
          <Dropzone onDrop={(event) => this.onDrop(event)}>
            <div>Перетягніть файли сюди, або натисніть на область, щоб вибрати файли для завантаження.</div>
          </Dropzone>
          <RaisedButton label='Зберегти зображення' style={style} onClick={() => this.savePicture()} />
        </div>
      </div>
    )
  }
}

export class ImageUploaderPreview extends Component {
 /**
  * Default properties of class
  *
  * @type {{preview: *}}
  */
  static propTypes = {
    preview: PropTypes.string                      // String with the href of the image
  };

  render () {
    return (
      <img src={this.props.preview} />
    )
  }
}

