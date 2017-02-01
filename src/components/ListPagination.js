import React from 'react'
// import agent from '../agent'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: 'SET_USERS', page, payload })
})

const ListPagination = props => {
  if (props.totalItems <= props.itemsPerPage) {
    return null
  }

  const range = []
  for (let i = 0; i < Math.ceil(props.totalItems / props.itemsPerPage); ++i) {
    range.push(i)
  }

  console.log(props)
  const setPage = page => props.onPageClick(page, props.itemsPerPage)

  return (
    <nav>
      <ul className='pagination'>
        {
          range.map(v => {
            const isCurrent = v === props.currentPage
            const onClick = ev => {
              ev.preventDefault()
              setPage(v)
            }
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={onClick}
                key={v.toString()}>

                <a className='page-link' href=''>{v + 1}</a>

              </li>
            )
          })
        }

      </ul>
    </nav>
  )
}

ListPagination.propTypes = {
  onPageClick: React.PropTypes.func.isRequired,
  totalItems: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number,
  itemsPerPage: React.PropTypes.number,
  onChange: React.PropTypes.func
}

export default connect(() => ({}), mapDispatchToProps)(ListPagination)
