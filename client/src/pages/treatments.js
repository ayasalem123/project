import Navbarvisitor from '../components/navbarvisitor';
import Cardcomponent from '../components/card';
import EditTreatment from '../components/input';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Navbaradmin from '../components/navbaradmin';
import Navbarsigned from '../components/navbarsigned';
function Treatment({ treatmentelement }) {
  const { userAuth } = useSelector((state) => state);
  const loggeduser = userAuth?.loggeduser;
  const [showEditForm, setShowEditForm] = useState(false);
  const handleclick = () => {
    setShowEditForm(true);
  };
  return (
    <div>
      {!loggeduser ? (
        <Navbarvisitor />
      ) : loggeduser.Role == 'user' ? (
        <Navbarsigned />
      ) : (
        <Navbaradmin />
      )}
      {loggeduser.Role == 'admin' && (
        <button onClick={handleclick}>add new treatment</button>
      )}
      {showEditForm ? <EditTreatment el={''} /> : null}
      {treatmentelement.length !== 0 ? (
        treatmentelement.map((el) => <Cardcomponent el={el} />)
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
export default Treatment;
