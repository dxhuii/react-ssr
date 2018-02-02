import React, { PureComponent } from 'react';
import Header from '../header';

class Layout extends PureComponent{
	
  render(){
    const { title, description, keywords } = this.props
    return (
      <div>
        <Header title={title} description={description} keywords={keywords} />
				{ this.props.children }
      </div>
    )
  }
}

export default Layout
