import Navbarvisitor from '../components/navbarvisitor';
import Cardcomponent from '../components/card';
import { useSelector } from "react-redux";
import Navbarsigned from '../components/navbarsigned';
function Treatment({treatmentelement}) {
  const { userAuth } = useSelector((state) => state);
  const loggeduser=userAuth?.loggeduser
    return (
        <div>
            {!loggeduser? <Navbarvisitor />:<Navbarsigned/>}
             {treatmentelement.length !== 0 ? (
        treatmentelement.map((el) => <Cardcomponent el={el} />)
      ) : (
        <div>loading</div>
      )}
        </div>
    )
}
export default Treatment;