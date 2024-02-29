import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomProvider, Table, Pagination, Whisper, Popover, Input, Button, Form, ButtonToolbar, SelectPicker } from 'rsuite';
import { locale } from "../../rsuite/locales/tr_TR";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import Toastify from '../../components/Toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGenderless, faHeartPulse, faMars, faPenToSquare, faQuestion, faThumbtack, faVenus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const dataStatus = [
    {
        label: "Hayatta",
        value: "alive"
    }, {
        label: "Ölü",
        value: "dead"
    }, {
        label: "Bilinmeyen",
        value: "unknown"
    },
]
const dataGender = [
    {
        label: "Kadın",
        value: "female"
    }, {
        label: "Erkek",
        value: "male"
    }, {
        label: "Cinsiyetsiz",
        value: "genderless"
    }, {
        label: "Bilinmeyen",
        value: "unknown"
    }

]

const Index = () => {
    const { control, handleSubmit, setValue, reset, watch } = useForm();
    const [character, setCharacter] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchStatus, setSearchStatus] = useState(false)

    useEffect(() => {
        searchStatus === false ? getCharacter() : onSubmit(watch("data"))
    }, [page])

    const getCharacter = async () => {
        setLoading(true)
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        setCharacter(response?.data?.results)
        setTotal(response?.data?.info.count)
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        const requestData = {
            name: data.name || "",
            status: data.status || "",
            species: data.species || "",
            type: data.type || "",
            gender: data.gender || ""
        };

        await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`, {
            params: requestData
        })
            .then((res) => {
                setCharacter(res.data?.results)
                setTotal(res.data?.info.count)
            })
            .catch((err) => {
                Toastify("error", "", "İlgili filtreye ait kayıt bulunamadı", () => {
                    setCharacter([])
                    setTotal(0)
                })
            })
        setValue("data", data)
        setLoading(false)
    }

    return (
        <>
            <div className="row bg-white mb-3 p-3 rounded shadow mx-0">
                <ToastContainer />
                <div className="col-12 p-2">
                    <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Controller
                                name="name"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, name, value }, ref }) => (
                                    <Input size="sm" name={name} placeholder='Karakter Adı' value={value} ref={ref} onChange={onChange} />)}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Controller
                                name="status"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, name, value }, ref }) => (
                                    <SelectPicker
                                        searchable={false}
                                        data={dataStatus}
                                        name={name}
                                        value={value}
                                        ref={ref}
                                        size="sm"
                                        style={{ minWidth: 180 }}
                                        placeholder="Durum "
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Controller
                                name="species"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, name, value }, ref }) => (
                                    <Input size="sm" name={name} placeholder="Tür" value={value} ref={ref} onChange={onChange} />)}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Controller
                                name="type"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, name, value }, ref }) => (
                                    <Input size="sm" name={name} placeholder="Tip" value={value} ref={ref} onChange={onChange} />)}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Controller
                                name="gender"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, name, value }, ref }) => (
                                    <SelectPicker
                                        searchable={false}
                                        data={dataGender}
                                        name={name}
                                        value={value}
                                        ref={ref}
                                        size="sm"
                                        style={{ minWidth: 180 }}
                                        placeholder="Cinsiyet "
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Form.Group>
                        <ButtonToolbar className='d-flex justify-content-end' >
                            <Button type="submit" className="border px-5" appearance="subtle" onClick={() => {
                                setSearchStatus(true)
                                setPage(1)
                            }}>Filtrele</Button>
                            <Button className="border px-5" appearance="primary" onClick={() => {
                                reset();
                                getCharacter();
                            }}>Temizle</Button>
                        </ButtonToolbar>
                    </Form>
                    <div className="row mb-3 ">
                        <div>
                            <CustomProvider locale={locale}>
                                <Table
                                    height={400}
                                    minHeight={400}
                                    loading={loading}
                                    autoHeight={true}
                                    data={character}
                                    cellBordered={true}
                                    hover={true}
                                    bordered={true}
                                    rowHeight={70}
                                >
                                    <Table.Column flexGrow={1} minWidth={250}>
                                        <Table.HeaderCell className="fw-semibold" >Karakter Bilgileri</Table.HeaderCell>
                                        <Table.Cell dataKey="image" >
                                            {rowData => (
                                                <>
                                                    <div className="row px-2">
                                                        <div className='col-auto'>
                                                            <Whisper placement="right"
                                                                controlId="control-id-hover"
                                                                trigger="hover"
                                                                style={{ cursor: 'pointer' }}
                                                                speaker={
                                                                    <Popover>
                                                                        <img src={rowData.image} width="100" alt="img" />
                                                                    </Popover>}>
                                                                <img src={rowData.image} width="40" alt="img2" />
                                                            </Whisper>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='mb-0'>
                                                                <Link to={`details/${rowData.id}`} className="cursor-pointer text-decoration-none text-dark" >
                                                                    {rowData.name}</Link>
                                                            </p>
                                                            <p className='small' >
                                                                {rowData.gender === 'Male' ?
                                                                    <><FontAwesomeIcon icon={faMars} /> Erkek</>
                                                                    : rowData.gender === 'Female' ?
                                                                        <><FontAwesomeIcon icon={faVenus} /> Kadın</>
                                                                        : rowData.gender === 'Genderless' ?
                                                                            <><FontAwesomeIcon icon={faGenderless} /> Cinsiyetsiz </>
                                                                            : <><FontAwesomeIcon icon={faQuestion} /> Bilinmeyen </>
                                                                }
                                                                <span className='px-2'> {rowData.status === "Alive" ?
                                                                    <><FontAwesomeIcon icon={faHeartPulse} color='green' /> Hayatta</>
                                                                    : rowData.status === "Dead" ?
                                                                        <><FontAwesomeIcon icon={faHeartPulse} color='red' /> Ölü</>
                                                                        : <><FontAwesomeIcon icon={faHeartPulse} color='gray' /> Bilinmiyor</>}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>

                                            )}
                                        </Table.Cell>
                                    </Table.Column>
                                    <Table.Column flexGrow={1} minWidth={250}>
                                        <Table.HeaderCell className="fw-semibold" >Konum Bilgileri</Table.HeaderCell>
                                        <Table.Cell dataKey="detail" >
                                            {rowData => (
                                                <>
                                                    <p className='mb-0'>Son Görüldüğü Yer </p>
                                                    <p className='small'><FontAwesomeIcon icon={faThumbtack} /> {rowData.location.name} </p>
                                                </>
                                            )}
                                        </Table.Cell>
                                    </Table.Column>
                                    <Table.Column width={120} fixed="right">
                                        <Table.HeaderCell align={"center"} className="fw-semibold">İşlemler</Table.HeaderCell>
                                        <Table.Cell align={"center"} verticalAlign='center' dataKey="detail">
                                            {rowData => (
                                                <>
                                                    <Link to={`details/${rowData.id}`} className="cursor-pointer" title="Detayına Git">
                                                        <FontAwesomeIcon icon={faPenToSquare} color='black' />
                                                    </Link>
                                                </>
                                            )}
                                        </Table.Cell>
                                    </Table.Column>
                                </Table>
                                <Pagination className="mt-2"
                                    prev
                                    next
                                    first
                                    last
                                    ellipsis
                                    boundaryLinks
                                    maxButtons={5}
                                    size="xs"
                                    layout={['total', '-', 'pager', 'skip']}
                                    total={total}
                                    limit={20}
                                    activePage={page}
                                    onChangePage={setPage}
                                />
                            </CustomProvider>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Index;
