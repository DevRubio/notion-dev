import { Client } from "@notionhq/client"

export default function Home({results}) {

  const getDataBaseDisplay = () =>{
    let jsx = []    
    results.forEach((Agrupador)=>{
      jsx.push(
        /*
        Agrupador: Title of table, first column
        Plataforma: Second column, in my case is a select
        Raizal: third column, in my case is a Text
        */
        <div className="card" key={Agrupador.id}>
          <p>{Agrupador.properties.Agrupador.title[0].plain_text}</p>
          <span>{Agrupador.properties.Plataforma.select.name}</span>
          <span>{Agrupador.properties.Raizal.rich_text[0].plain_text}</span>
        </div>
      )
    })
    return jsx
  }

  return (
    <main
      className={`flex flex-col items-center justify-between`}
    >
      
        <h1>Agrupadores:</h1>
        {getDataBaseDisplay()}
    

    </main>
  )
}

export async function getStaticProps(){
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const database = 'eda3c7b51a3f47789051022f56a8e258' /*You ID of Database */
  const response = await notion.databases.query({
    database_id: database
  })   
  return{
    props:{
      results: response.results
    }
  }
}
