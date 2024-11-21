const express=require('express');
const app=express();

app.use(express.json());

// const books=[
//     {id:1, name:'rich dad and poor dad'},
//     {id:2, name:'the war of art'},
//     {id:2, name:'rework'}
// ];

// app.get('/', (req,res)=>{
//     res.send('Salom');
// })

// app.post('/api/books', (req,res)=>{
//     if(!req.body.name){
//         res.status(400).send('Name is required');
//         return ;
//     }
//     if(req.body.name.length<3){
//         res.status(400).send('The name should be at least 3 characters long');
//         return;
//     }
//    const book={
//     id:books.length+1,
//     name:req.body.name
//    };
//    books.push(book);
//    res.status(201).send(book);
// });


// app.put('/api/books/:id', (req,res)=>{
//     const book=books.find(b=>b.id===parseInt(req.params.id));
// if(!book){
//     res.status(404).send('Invalid book id');
//     return;
// }
// if(!req.body.name){
//     res.status(400).send('Name is required');
//     return ;
// }
// if(req.body.name.length<3){
//     res.status(400).send('The name should be at least 3 characters long');
//     return;
// }
//  book.name=req.body.name;
//  res.send(book);
// });

// app.get('/api/books',(req,res)=>{
//     res.send(books);
// })

// app.delete('/api/books/:id', (req,res)=>{
//     const book=books.find(b=>b.id===parseInt(req.params.id));
//     if(!book){
//         return res.status(404).send('Invalid book id');
//     }
//     const bookIndex=books.indexOf(book);
//     books.splice(bookIndex,1);
//     res.send(book);
// });



const categories=[
    {id:1, name:'nodeJs'},
    {id:2, name:'Java'},
    {id:3, name:'Php'},
    {id:4, name:'Python'}
];

app.get('/virtualdars.com/api/categories', (req,res)=>{
    res.send(categories);
});

app.put('/virtualdars.com/api/categories/:id', (req,res)=>{
    const category=categories.find(c=>c.id===parseInt(req.params.id));
    if(!category){
        return res.status(404).send('Invalid id');
    }
    if(req.body.name<3){
      return  res.status(400).send('The name of the category shouldl be at least 3 characters')
    }
    if(!req.body.name){
        return res.status(400).send('The name of the category is required');
    }
    category.name=req.body.name;
    res.send(category);
});

app.post('/virtualdars.com/api/categories', (req,res)=>{
    if(!req.body.name){
        return res.status(400).send('The name of the category is required');
    }
    if(req.body.name<3){
        return  res.status(400).send('The name of the category shouldl be at least 3 characters')
      }
      const category={
        id:categories.length+1,
        name:req.body.name
      };
      categories.push(category);
      res.send(category);
});

app.delete('/virtualdars.com/api/categories/:id', (req,res)=>{
    const category=categories.find(c=>c.id===parseInt(req.params.id));
    if(!category){
        return res.status(404).send('Invalid id');
    }
    const categoryIndex=categories.indexOf(category);
    categories.splice(categoryIndex,1);
    res.send(category);
})



const port=process.env.PORT||8000;
app.listen(8000, ()=>{
    console.log(`server is running or port ${port}  `);
    
})