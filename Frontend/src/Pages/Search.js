import { Card,Row, Col , Container } from "react-bootstrap"
import { useEffect, useState} from 'react'
import   {useParams} from "react-router-dom";

import "../Assets/Styles/App.css"

const Search = () => {
  const [listBD, setlistBD] = useState([])
  const [nbrBookPerRow, setnbrBookPerRow] = useState(5); /*Min : 1 , Max : 6*/
  let { name } = useParams();

  useEffect(()=>{
    /* Cette fonction fait un appel à l'API pour récuperer les livres en fonction de leur nom
    PRE : /
    POST : /
    */
    fetch("/books/search/"+name).then(res =>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => {
      setlistBD(jsonResponse)
    })
  },[])


  useEffect(() => {
      /* Cette fonction permet d'ajuster la page à une taille d'écran
    PRE : /
    POST : /
    */ 
    window.matchMedia("(min-width: 768px)").addEventListener('change', () => setnbrBookPerRow(2));
    window.matchMedia("(min-width: 1000px)").addEventListener('change', () => setnbrBookPerRow(3));
    window.matchMedia("(min-width: 1200px)").addEventListener('change', () => setnbrBookPerRow(4));
    window.matchMedia("(min-width: 1400px)").addEventListener('change', () => setnbrBookPerRow(5));
  }, []);
  

    return <div className="ListContent">
              <Container>
              <Row className="justify-content-md-center mb-4">
                    <Col md="auto">
                        <h1> Recherche pour '{name}'</h1>
                    </Col>
                </Row>
                <Row xs={1} md={nbrBookPerRow}>
                  {
                    listBD.map((myBD,index) => {
                      let nameBD= " ";
                      nameBD = myBD.name;
                      return (
                        <Col key={"Col"+index} style={{marginBottom:'5px'}}>
                          <a href={'/detail/books/'+myBD._id} style={{textDecoration:'none'}}>
                            <Card key={myBD._id}>
                              <Card.Img variant="top" src={myBD.link}/>
                              <Card.Body style={{backgroundColor:'hsl(52, 97%, 55%)'}}>
                                <Card.Title style={{minHeight:"2em",fontSize:"20px",color:'black'}}>{nameBD}</Card.Title>
                                <Card.Text  className="priceBD">{myBD.price}€</Card.Text>
                              </Card.Body>
                            </Card>
                          </a>
                        </Col>
                      )
                    })  
                  }
                </Row>
              </Container>
            </div>
    }
    export {Search}