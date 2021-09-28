import './App.css';
import data from './data/products.json';
import React, {useEffect} from 'react';

function App() {

  //declare variables here, pre-load the data for each filter to make things easier
  const [clothes, setClothes] = React.useState(data);
  const price_sorted_clothes = data.sort(function(a, b) {return parseInt(b.price.substring(1)) - parseInt(a.price.substring(1))});
  const exclusive_clothes = data.filter(item => item['isExclusive'] === true);
  const sale_clothes = data.filter(item => item['isSale'] === true);
  const xs_clothes = data.filter(item => item['size'].includes("XS"));
  const s_clothes = data.filter(item => item['size'].includes("S"));
  const m_clothes = data.filter(item => item['size'].includes("M"));
  const l_clothes = data.filter(item => item['size'].includes("L"));
  const xl_clothes = data.filter(item => item['size'].includes("XL"));
  //get the screen width and update it on window re-size, makes responsive layout easier
  const [width, setWidth]   = React.useState(window.innerWidth);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
  }
  //everytime window is re-sized we will know about it
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  //function to determine which data-set to use, depending on the filter the user selects
  function handleFilterChange(filter){
    if(filter === "price") setClothes(price_sorted_clothes)
    if(filter === "exclusive") setClothes(exclusive_clothes)
    if(filter === "sale") setClothes(sale_clothes)
    if(filter === "xs") setClothes(xs_clothes)
    if(filter === "s") setClothes(s_clothes)
    if(filter === "m") setClothes(m_clothes)
    if(filter === "l") setClothes(l_clothes)
    if(filter === "xl") setClothes(xl_clothes)
  }

  //function to check the window width and return appropriate css for the grid, we don't want too many squares on a small screen
  function getResultsStyle(){
    if (width < 1300) {
      return (width < 1000 ? {gridTemplateColumns: 'repeat(1, 1fr)'} : {gridTemplateColumns: 'repeat(2, 1fr)'})
    }else{
      return {gridTemplateColumns: 'repeat(4, 1fr)'}
    }
  }

  return (
        <div className="App">
          <div className="wrapper" style={{marginBottom:'6%'}}>
            <div className="header">
                <p style={{margin: '0.1% 0% 0.5% 0.5%', textAlign:'left'}}> Women's tops</p>
                <select name="filters" id="filters" onChange={e => handleFilterChange(e.target.value)}>
                  <option value="price">Filter by price</option>
                  <option value="exclusive">Filter by exclusive</option>
                  <option value="sale">Filter by sale</option>
                  <option value="xs">Filter by size (XS) </option>
                  <option value="s">Filter by size (S) </option>
                  <option value="m">Filter by size (M) </option>
                  <option value="l">Filter by size (L) </option>
                  <option value="xl">Filter by size (XL) </option>
                </select>
            </div>
            {/*if the screen width is less than 1300px, we will render 2 items per row, less than 1000px, we will render 1 item per row etc*/}
            <div className="results" style={getResultsStyle()} >
              {
                clothes.map((item, i) => (
                  <div className="cell" key={i}>
                    <img className="productImage" src={'Products/' + item['productImage']} alt="product" />
                    {item['isSale'] ? <div className="tag" style={{backgroundColor:'#cc3333'}}> <p style={{margin:0, textAlign:'center'}}> Sale </p> </div> : ''}
                    {item['isExclusive'] ? <div className="tag" style={{backgroundColor:'#009900'}}> <p style={{margin:0, textAlign:'center'}}> Exclusive </p> </div> : ''}
                    <div className="name_and_price">
                      <p className="productText" id="product_name"> {item["productName"]} </p>
                      <p className="productText" id="price"> {item["price"]} </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
  );
}

export default App;
