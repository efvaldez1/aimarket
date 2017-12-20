import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'


// Material UI
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import BalanceIcon from 'material-ui/svg-icons/action/account-balance';
class Header extends Component {

  render() {
    const PageMenu = (
      <IconMenu

        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem >{<Link to='/'>new</Link>} </MenuItem>
        <MenuItem  > {<Link to='/top'>top</Link>}</MenuItem>
        <MenuItem  > <Link to='/search'>search</Link></MenuItem>
        <MenuItem  > <Link to='/category'>categories</Link></MenuItem>
        <MenuItem > <Link to='/createtag'>create tag </Link></MenuItem>

          <MenuItem >
            <Link to='/create' >submit product</Link>
          </MenuItem>


      </IconMenu>
    );

    const LogoutMenu = (
      <IconMenu

        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >

        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Logout" />
      </IconMenu>
    );

    const styles = {
      title: {
        cursor: 'pointer',
      },
    };

    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div>
            <AppBar title={<span style={styles.title}>AI Market</span>} iconElementLeft={PageMenu}  iconElementRight={LogoutMenu} />

            <div className='flex pa1 justify-between nowrap orange'>
              <div className='flex flex-fixed black'>
                <div className='fw7 mr1'>AI Market</div>
                <Link to='/' className='ml1 no-underline black'>new</Link>
                <div className='ml1'>|</div>
                <Link to='/top' className='ml1 no-underline black'>top</Link>
                <div className='ml1'>|</div>
                <Link to='/search' className='ml1 no-underline black'>search</Link>
                <div className='ml1'>|</div>
                <Link to='/category' className='ml1 no-underline black'>categories</Link>
                <div className='ml1'>|</div>
                <Link to='/createcategory' className='ml1 no-underline black'>create category</Link>
                <div className='ml1'>|</div>
                <Link to='/createtag' className='ml1 no-underline black'>create tag </Link>
                {userId &&
                <div className='flex'>
                  <div className='ml1'>|</div>
                  <Link to='/create' className='ml1 no-underline black'>submit product</Link>
                </div>
                }
              </div>
              <div className='flex flex-fixed'>
                <Link to='/profile' className='ml1 no-underline black'>profile</Link>
                <div className='ml1'>|</div>
                {userId ?
                  <div className='ml1 pointer black' onClick={() => {
                    localStorage.removeItem(GC_USER_ID)
                    localStorage.removeItem(GC_AUTH_TOKEN)
                    this.props.history.push(`/new/1`)
                  }}>logout</div>
                  :
                  <Link to='/login' className='ml1 no-underline black'>login</Link>
                }
              </div>
            </div>
      </div>

    )
  }

}

export default withRouter(Header)
