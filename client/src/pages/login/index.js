import React from 'react';
import {
    Container,
    Content,
    Input,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid
} from 'rsuite';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { ToastContainer } from 'react-toastify';
import Toastify from '../../components/Toastify';
import api from '../../utils/axiosInterceptor';


const Index = () => {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await api.post('api/users/login', data);
            if (response.status === 200) {
                dispatch(login(response.data));
                navigate('/')
            }
        } catch (error) {
            console.error('Kayıt işlemi başarısız:', error);
            Toastify("error", "", "Giriş işlemi başarısız", () => { })
        }
    }

    return (
        <Container>
            <ToastContainer />
            <Content>
                <FlexboxGrid justify="center" >
                    <FlexboxGrid.Item colspan={8}>
                        <Panel header={<p style={{ fontSize: 22 }}>Giriş</p>} bordered>
                            <Form fluid onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.ControlLabel>E-posta</Form.ControlLabel>
                                    <Controller
                                        name="email"
                                        defaultValue={""}
                                        control={control}
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
                                    {errors.email ? (<p>{errors.email.message}</p>) : ""}

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
                                    {errors.password ? (<p>{errors.password.message}</p>) : ""}
                                </Form.Group>
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button appearance="primary" className='w-100' type="submit">Giriş</Button>

                                    </ButtonToolbar>
                                    <Link to="/register" className="d-flex justify-content-end pt-5 small cursor-pointer text-decoration-none fw-semibold" >
                                        Kullanıcı Oluştur</Link>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}
export default Index;
