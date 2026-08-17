import CreateUrlShortCodeForm from "../../features/url/CreateUrlShortCodeForm";
import ReadUrlByShortCodeForm from "../../features/url/ReadUrlByShortCodeForm";
export default function Dashboard() {
  return (
    <div>
    <ReadUrlByShortCodeForm/>
       <CreateUrlShortCodeForm/>
    </div>
  )
}
