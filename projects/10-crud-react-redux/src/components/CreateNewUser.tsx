import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUsersActions";
import { useState } from "react";


export function CreateNewUser() {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setResult(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            return setResult('ko');
        }

        addUser({ name, email, github });

        form.reset();

        setResult('ok');
    }
    return (
        <Card style={{ marginTop: '16px' }}>
            <Title>Create new user</Title>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <TextInput name="name" placeholder="Aquí el nombre" />
                <TextInput name="email" placeholder="Aquí el email" />
                <TextInput name="github" placeholder="Aquí el usuario github" />

                <div>
                    <Button type="submit" style={{ marginTop: "16px" }}>
                        Crear usuario
                    </Button>

                    <span>
                        {result === 'ok' && <Badge color='green'>Guardado correctamente</Badge>}
                        {result === 'ko' && <Badge color='green'>Error en los campos</Badge>}
                    </span>
                </div>
            </form>
        </Card>
    )
}