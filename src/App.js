import React from 'react';
import logo from './logo/SMK_SecondaryLogo_Black.png'

/**
 * React app fetching data from Statens Museum for Kunst API
 * 
 */


class App extends React.Component {

/**
 * constructor
 * 
 */


    constructor() {

        super();  
    

        this.state = {
            items: null,
            isLoaded: false
        }
    }
    

    /**
     * componentDidMount
     * 
     * Fecthing json array from url and updating state 
     */
    componentDidMount() {

        fetch('https://api.smk.dk/api/v1/art/search/?keys=stue&facets=has_image&filters=has_image%3Atrue&offset=8&rows=1' )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json.items,
                    isLoaded: true, 
                })
            }).catch((error) => {
                console.log(error);
            });

    }

    /**
     * async fetchImage
     * 
     * Asynchronous function fecthing just one 
     * random image from url using searchterms
     */

    async fetchImage(){
        const searchterms = [ 
        {term: 'stue', amount: 32}, 
        {term: 'hjem', amount: 102}, 
        {term: 'køkken', amount: 19},
    ]
        const random = Math.floor(Math.random() * searchterms.length)
        const search = searchterms[random]

        const response = await fetch
        (`https://api.smk.dk/api/v1/art/search/?keys=${search.term}&facets=has_image&filters=has_image%3Atrue&offset=
        ${Math.floor(Math.random() * search.amount - 1)}&rows=1`);
        const json = await response.json();
        this.setState({
            items:json.items
    })

}
        

    /**
     * render
     * 
     * Rendering the UI 
     */
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading</div>;

        return (
            <div className="App">    
            <div className="text">
                    <h1> Hjemmet som model</h1>
                    <p>Lad kunst inspireret af hjemmet forskønne dit liv i en hjemmegående tid</p>
                    </div>
                    <div className="button-container">
                    <button className="button" 
                    type="submit" width="20%"
                    onClick={this.fetchImage.bind(this)}>
                        Næste
                        </button>
                        </div>
                    {items.map(item => (
                       <div className="image-container" key={item.id}>
                       <img 
                        key={item.id}
                        src={item.image_thumbnail}
                        alt={item.titles[0].title}
                        />
                        </div>  
                    ))}
                
                        <div className="logo">
                        <img src={logo} width="7%" alt="logo"/>
                        </div>
            </div>
        );
    }
}

export default App;