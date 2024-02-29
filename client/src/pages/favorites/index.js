import React, { useEffect, useState } from 'react';
import { Panel } from 'rsuite';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import Toastify from '../../components/Toastify';
import api from '../../utils/axiosInterceptor';

const textEllipsis = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"

}
const Index = () => {
    const user_id = useSelector(state => state.user.userData?.userId);
    const [favorites, setFavorites] = useState()
    const baseURL = 'http://localhost:3000/'; 

    useEffect(() => {
        getFavorites()
    }, [])

    const getFavorites = async () => {
        const response = await api.get(`api/favorites/favorites/${user_id}`)
        setFavorites(response.data.favorites)
    }
    const removeFavorites = async (id) => {
        try {
            const res = await api.delete(`api/favorites/${user_id}/favorite-characters/${id}`);
            Toastify(res.data.status, "", res.data.message, () => { getFavorites() });
        } catch (error) {
            Toastify(error.response.data.status, "", error.response.data.message, () => { });
            console.error('Favoriden çıkartma hatası:', error);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='' >
                {favorites?.map((i, index) => (
                    <Panel shaded bordered bodyFill className='m-3 p-2' style={{ display: 'inline-block', width: 300 }} key={index}>
                        <img src={i.detail.image} className="img-fluid" height="200" alt="img-panel" />
                        <Panel header={
                            <Link to={`${baseURL}details/${i.detail.id}`} className="cursor-pointer text-decoration-none text-dark" title="Detayına Git">
                                {i.detail.name}
                            </Link>

                        }>
                            <p style={textEllipsis}>
                                <small >
                                    Son görüldüğü yer  : {i.detail.location.name}
                                </small>
                            </p>
                            <p style={textEllipsis}>
                                <small >
                                    İlk kez görüldüğü yer  : {i.detail.origin.name}
                                </small>
                            </p>
                            <div className='d-flex justify-content-end'>
                                <FontAwesomeIcon icon={faHeart} className='fs-4' style={{ cursor: "pointer" }} color='red' onClick={() => { removeFavorites(i.detail.id) }} />
                            </div>
                        </Panel>
                    </Panel>
                )
                )}
            </div>
        </>
    )
}
export default Index;
