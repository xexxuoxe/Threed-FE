/*
  title : company main page
  writer : 이은서
  src : http://localhost:3000/
*/
import { redirect } from "next/navigation";

export default function Home() {
    redirect('/m/blog');
}