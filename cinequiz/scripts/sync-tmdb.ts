import { PrismaClient } from '@prisma/client';
const db=new PrismaClient();
const key=process.env.TMDB_API_KEY;
if(!key){console.error('TMDB_API_KEY manquante');process.exit(1)}
async function main(){for(let page=1;page<=5;page++){
 const r=await fetch(`https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=${page}`,{headers:{Authorization:`Bearer ${key}`,accept:'application/json'}});
 if(!r.ok)throw new Error(`TMDB ${r.status}`); const data=await r.json();
 for(const m of data.results){await db.movie.upsert({where:{tmdbId:m.id},update:{title:m.title,originalTitle:m.original_title,releaseYear:m.release_date?Number(m.release_date.slice(0,4)):null,posterPath:m.poster_path,backdropPath:m.backdrop_path,overview:m.overview,popularity:m.popularity},create:{tmdbId:m.id,title:m.title,originalTitle:m.original_title,releaseYear:m.release_date?Number(m.release_date.slice(0,4)):null,posterPath:m.poster_path,backdropPath:m.backdrop_path,overview:m.overview,popularity:m.popularity}})}
 }
 console.log('Synchronisation TMDB terminée.');}
main().finally(()=>db.$disconnect());
