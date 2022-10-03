import React, {Component} from 'react';

class Footer extends Component {
    render () {
        return (
            <div style={{ width: '100%', backgroundColor: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='parentcontainer'>
                <h5 style={{paddingTop: '20px', paddingBottom: '20px'}}>Created by: Ludvik Braathen, Oda Colquhoun, Catarina Skibsrud og Erik Wahlstrøm</h5>
            </div>
           
        </div>
        )
    }
}

export default Footer;