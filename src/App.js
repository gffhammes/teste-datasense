import {
  Button,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

let productsDataQty = 4;

function App() {
  const [productsQty, setProductsQty] = useState(0);
  const [products, setProducts] = useState([]);

  const loadMoreProducts = () => {
    productsDataQty &&
      axios
        .get(`https://fakestoreapi.com/products?limit=${productsDataQty}`)
        .then(({ data }) => {
          const newProducts = [];
          data &&
            data.forEach((product) => {
              newProducts.push(product);
            });
          setProducts(newProducts);
        });
    productsDataQty += 4;
    console.log(products);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  // fetch("https://fakestoreapi.com/products?limit=5")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => setProductsQty(json.length));

  // console.log(productsQty);

  return (
    <div className="App">
      <header className="App-header"></header>

      <Container>
        <Typography variant="h1">Products List</Typography>
        <Typography>{productsQty} products</Typography>
        <Grid container spacing={2}>
          {products.map((product) => {
            return (
              <Grid item xs={6} key={product.id}>
                {" "}
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.rating.rate}/5
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      ${product.price}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {productsDataQty <= productsQty && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              loadMoreProducts();
            }}
          >
            More
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
