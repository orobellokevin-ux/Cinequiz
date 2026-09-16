import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me');
export async function createSession(userId:string){
  const token=await new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret);
  (await cookies()).set('cinequiz_session',token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:60*60*24*30,path:'/'});
}
export async function getSessionUserId(){
  const token=(await cookies()).get('cinequiz_session')?.value; if(!token)return null;
  try{return (await jwtVerify(token,secret)).payload.userId as string;}catch{return null;}
}
export async function clearSession(){(await cookies()).delete('cinequiz_session');}
