import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../utils/axiosInterceptor';
import { useParams } from 'react-router-dom';
import { Panel, Stack, Grid, Row, Col, FlexboxGrid, Divider } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGenderless, faHeart, faHeartPulse, faMars, faPersonHalfDress, faQuestion, faUserGear, faUserNinja, faUserSecret, faVenus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import Toastify from '../../components/Toastify';
import { useSelector } from 'react-redux';


const Index = () => {
    const { id } = useParams();
    const baseURL = 'http://localhost:4000/'; 
    const [details, setDetails] = useState(null)
    const [isFavorite, setIsFavorite] = useState(null)
    const user_id = useSelector(state => state.user.userData?.userId);

    useEffect(() => {
        getDetails()
        getIsFavorite()
    }, [])

    const getDetails = async () => {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setDetails(response?.data);
    }

    const getIsFavorite = async () => {
        const fav_res = await api.get(`${baseURL}api/favorites/check-favorite/${user_id}/${id}`)
        setIsFavorite(fav_res.data.isFavorite);
    }

    const addFavorites = async () => {
        try {
            const res = await api.post(`${baseURL}api/favorites/${user_id}/favorite-characters/${id}`, { "details": details });
            Toastify(res.data.status, "", res.data.message, () => { getIsFavorite() });
        } catch (error) {
            Toastify(error.response.data.status, "", error.response.data.message, () => { });
            console.error('Favori ekleme hatası:', error);
        }
    }

    const removeFavorites = async () => {
        try {
            const res = await api.delete(`${baseURL}api/favorites/${user_id}/favorite-characters/${id}`);
            Toastify(res.data.status, "", res.data.message, () => { getIsFavorite() });
        } catch (error) {
            Toastify(error.response.data.status, "", error.response.data.message, () => { });
            console.error('Favoriden çıkartma hatası:', error);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8'>
                    <Panel
                        bordered
                        header={
                            <Stack justifyContent="space-between" >
                                <h4>{details?.name}</h4>
                                    {isFavorite === false ? <FontAwesomeIcon icon={faHeart} onClick={addFavorites} className='fs-4' style={{ cursor: "pointer" }} color='gray' />
                                        : <FontAwesomeIcon icon={faHeart} onClick={removeFavorites} className='fs-4' style={{ cursor: "pointer" }} color='red' />}
                            </Stack>
                        }
                    >
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xs={24} md={8} className='mb-4'>
                                    <img src={details?.image} className='img-fluid border rounded-4 mb-2' alt="img-card"/>
                                </Col>
                                <Col xs={24} md={12} >
                                    {details?.gender === 'Male' ?
                                        <><FontAwesomeIcon icon={faMars} className='fs-3 pe-2' /> Erkek</>
                                        : details?.gender === 'Female' ?
                                            <><FontAwesomeIcon icon={faVenus} className='fs-3 pe-2' /> Kadın</>
                                            : details?.gender === 'Genderless' ?
                                                <><FontAwesomeIcon icon={faGenderless} className='fs-3 pe-2' /> Cinsiyetsiz </>
                                                : <><FontAwesomeIcon icon={faQuestion} className='fs-3 pe-2' /> Bilinmeyen </>
                                    }
                                    <span className='px-2'> {details?.status === "Alive" ?
                                        <><FontAwesomeIcon icon={faHeartPulse} className='fs-3 pe-2' color='green' /> Hayatta</>
                                        : details?.status === "Dead" ?
                                            <><FontAwesomeIcon icon={faHeartPulse} className='fs-3 pe-2' color='red' /> Ölü</>
                                            : <><FontAwesomeIcon icon={faHeartPulse} className='fs-3 pe-2' color='gray' /> Bilinmiyor</>}</span>
                                    <span className='px-2'> {details?.species === "Human" ?
                                        <><FontAwesomeIcon icon={faPersonHalfDress} color='blue' className='fs-3 pe-2' /> İnsan</>
                                        : details?.species === "Alien" ?
                                            <><FontAwesomeIcon icon={faUserNinja} color='green' className='fs-3 pe-2' /> Dünya Dışı</>
                                            : details?.species === "Robot" ?
                                                <><FontAwesomeIcon icon={faUserGear} className='fs-3 pe-2' /> Robot</>
                                                : <><FontAwesomeIcon icon={faUserSecret} color='gray' className='fs-3 pe-2' /> Bilinmiyor</>}</span>

                                </Col>
                                <Col xs={24} md={16} className="mt-4">
                                    <Divider />
                                    <FlexboxGrid style={{ marginBottom: 10 }} >
                                        <FlexboxGrid.Item colspan={10} >Bulunduğu Bölüm Sayısı: </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={12}>{details?.episode.length}</FlexboxGrid.Item>
                                    </FlexboxGrid>
                                    <FlexboxGrid style={{ marginBottom: 10 }} >
                                        <FlexboxGrid.Item colspan={10}>Son Görüldüğü Yer: </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={12}>{details?.location.name}</FlexboxGrid.Item>
                                    </FlexboxGrid>
                                    <FlexboxGrid style={{ marginBottom: 10 }} >
                                        <FlexboxGrid.Item colspan={10}>İlk Kez Görüldüğü Yer: </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={12}>{details?.origin.name}</FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </div>

            </div>
        </>
    )
}
export default Index;
