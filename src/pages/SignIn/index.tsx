import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn, user } = useAuth();
    const { addToast } = useToast();

    console.log(user);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({ email: data.email, password: data.password });

                addToast({
                    type: 'success',
                    title: 'Sucesso',
                    description:
                        'Usuário autenticado',
                });

            } catch (err) {
                const formattedErrors = getValidationErrors(err);
                formRef.current?.setErrors(formattedErrors);

                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu um erro ao fazer login, verifique as credenciais.',
                });
            }
        },
        [signIn, addToast],
    );

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber"></img>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input
                        name="email"
                        icon={FiMail}
                        type="text"
                        placeholder="E-mail"
                        autoComplete="off"
                    ></Input>
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                        autoComplete="off"
                    ></Input>

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
