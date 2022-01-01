import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import React , {useState,useEffect} from 'react';
import Newscards from './components/Newscards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alankey='799117f272c27f8416297e4dd9e952752e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
 const [newsArticles, setnewsArticles]= useState([]);
 const [activeArticle, setactiveArticle]=useState(-1);
 const classes=useStyles();

  useEffect(()=>{
    alanBtn({ 
      key: alankey,
      onCommand:({command, articles, number})=>{
        if(command==='newHeadlines'){
          setnewsArticles(articles);
          setactiveArticle(-1);
        }
        else if(command==='highlight'){
          setactiveArticle((prevActiveArticle)=>prevActiveArticle+1);
        }
        else if(command==='open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber>20){
            alanBtn().playText('Please try that again')
          }
          else if(article){
            window.open(article.url,'_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  },[])

  return (
    <> 
       <h1 style={{textAlign:'center', paddingTop:'50px'}}>Voice Controlled News Application</h1>
       <Newscards articles={newsArticles} activeArticle={activeArticle} />
    </>
  );
}

export default App;

 