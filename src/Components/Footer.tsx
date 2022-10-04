import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{ width: '100%', backgroundColor: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className='footer'>
                    <h5 className='footerText'>Created by: Ludvik Braathen, Oda Colquhoun, Catarina Skibsrud og Erik Wahlstrøm</h5>
                </div>

            </div>
        )
    }
}

export default Footer;