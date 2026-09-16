import { PrismaClient } from '@prisma/client';
const db=new PrismaClient();
const data=[
 {title:'Inception',year:2010,answers:['Inception','Interstellar','Tenet','Dunkerque']},
 {title:'Pulp Fiction',year:1994,answers:['Pulp Fiction','Reservoir Dogs','Kill Bill','Heat']},
 {title:'The Dark Knight',year:2008,answers:['The Dark Knight','Batman Begins','Joker','Man of Steel']},
 {title:'Interstellar',year:2014,answers:['Interstellar','Gravity','Arrival','Ad Astra']},
 {title:'Jurassic Park',year:1993,answers:['Jurassic Park','Jaws','King Kong','The Lost World']}
];
async function main(){
 for(const m of data){const movie=await db.movie.upsert({where:{title:m.title},update:{releaseYear:m.year},create:{title:m.title,releaseYear:m.year}});
  const existing=await db.question.findFirst({where:{movieId:movie.id,type:'MOVIE'}});
  if(!existing){await db.question.create({data:{type:'MOVIE',text:'De quel film s’agit-il ?',movieId:movie.id,answers:{create:m.answers.map(label=>({label,correct:label===m.title}))}}});}
  const yearQ=await db.question.findFirst({where:{movieId:movie.id,type:'YEAR'}});
  if(!yearQ){const years=[m.year,m.year-1,m.year+2,m.year+5];await db.question.create({data:{type:'YEAR',text:`En quelle année est sorti « ${m.title} » ?`,movieId:movie.id,answers:{create:years.map((y,i)=>({label:String(y),correct:i===0}))}}});}
 }
 console.log('CineQuiz seed terminé.');
}
main().finally(()=>db.$disconnect());
