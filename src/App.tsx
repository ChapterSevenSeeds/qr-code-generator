import { ActionIcon, Button, Center, Stack, TextInput } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import { useRef, useState } from "react";
import QRCode from 'qrcode';
import { IconSquareX } from '@tabler/icons-react';


export default function App() {
    const [text, setText] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [generated, setGenerated] = useState(false);

    async function generate() {
        QRCode.toCanvas(canvasRef.current, text, {
            width: 300
        }, function (error) {
            if (error) {
                showNotification({
                    message: "URL is too big!",
                    color: 'red',
                    autoClose: 5000
                });
            } else {
                setGenerated(true);
            }
        });
    }

    function download() {
        var link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvasRef?.current?.toDataURL()!
        link.click();
    }

    return (
        <Center sx={{ width: '100%' }}>
            <Stack
                sx={theme => ({
                    padding: `${theme.spacing.md}px 0px`,
                    width: '300px'
                })}
                spacing="lg"
            >
                <TextInput
                    label="URL"
                    width='300px'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rightSection={<ActionIcon onClick={() => setText('')}><IconSquareX /></ActionIcon>}
                />
                <Button onClick={generate} disabled={text === ""}>Generate</Button>
                <canvas ref={canvasRef} width={300} height={300} />
                {generated &&
                    <>
                        <Button onClick={download}>Download</Button>
                    </>
                }
            </Stack>
        </Center>
    );
}