import React from 'react';
import { Container, Content, Form, Input, Button, Panel, FlexboxGrid, ButtonToolbar } from 'rsuite';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Toastify from '../../components/Toastify';
import api from '../../utils/axiosInterceptor';

const Index = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.post('api/users/register', data);
            Toastify(res.data.status, "", res.data.message, () => { navigate('/login'); });
        } catch (err) {
            Toastify(err.response.data.status, "", err.response.data.message, () => { });
        }
    };
    return (
        <>
            <Container>
                <ToastContainer />
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={8}>
                            <Panel header={<p style={{ fontSize: 22 }}>Kayıt Ol</p>} bordered>
                                <Form fluid onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group>
                                        <Form.ControlLabel>Kullanıcı Adı</Form.ControlLabel>
                                        <Controller
                                            name="username"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field: { onChange, name, value }, ref }) => (
                                                <Input value={value} name={name} ref={ref}
                                                    onChange={onChange}
                                                    autoComplete="off"
                                                    placeholder="Kullanıcı Adı"
                                                />
                                            )}
                                            rules={{
                                                required: {
                                                    value: true, message: "Bu alan zorunlu"
                                                }
                                            }}
                                        />
                                        {errors.username ? (<p className='small text-danger'>{errors.username.message}</p>) : ""}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>E-posta</Form.ControlLabel>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field: { onChange, name, value }, ref }) => (
                                                <Input value={value} name={name} ref={ref}
                                                    onChange={onChange}
                                                    type="email"
                                                    autoComplete="off"
                                                    placeholder="E-posta"
                                                />
                                            )}
                                            rules={{
                                                required: {
                                                    value: true, message: "Bu alan zorunlu"
                                                }
                                            }}
                                        />
                                        {errors.email ? (<p className='small text-danger'>{errors.email.message}</p>) : ""}

                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Şifre</Form.ControlLabel>
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field: { onChange, name, value }, ref }) => (
                                                <Input value={value} name={name} ref={ref}
                                                    onChange={onChange}
                                                    type="password"
                                                    autoComplete="off"
                                                    placeholder="Şifre"
                                                />
                                            )}
                                            rules={{
                                                required: {
                                                    value: true, message: "Bu alan zorunlu"
                                                }
                                            }}
                                        />
                                        {errors.password ? (<p className='small text-danger'>{errors.password.message}</p>) : ""}
                                    </Form.Group>
                                    <Form.Group>
                                        <ButtonToolbar>
                                            <Button appearance="primary" className='w-100' type="submit">Kayıt Ol</Button>
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        </>


    );
};

export default Index;
