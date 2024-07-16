'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { generateSocialMediaPost, validateContent, validateFinalContent } from "../config/gemini";
import Toolkit from '../components/Toolkit';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 'your-telegram-bot-token';

export default function MakeContent() {
    const [chatId, setChatId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    const [editedText, setEditedText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outputText && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [outputText]);

    const sendMessage = async (outputText: string, chatId: string) => {
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            console.log('Sending message to Telegram with chatId:', chatId);
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId.trim(),
                    text: outputText,
                }),
            });

            const data = await response.json();
            console.log('Telegram response:', data);
            if (data.ok) {
                setResponse('Message sent successfully!');
            } else {
                setResponse(`Failed to send message: ${data.description}`);
                setError(`Failed to send message: ${data.description}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setResponse('Error occurred while sending message.');
            setError('Error occurred while sending message.');
        }
    };

    const handleGenerate = async () => {
        if (!description) {
            setError("Пожалуйста, введите описание перед генерацией контента.");
            return;
        }

        let inputText = `Описание: ${description}`;

        try {
            setLoading(true);
            setError(null);

            const isValid = await validateContent(inputText);
            if (!isValid) {
                setError("Содержимое содержит запрещенные слова или фразы.");
                setLoading(false);
                return;
            }

            const result = await generateSocialMediaPost(inputText);
            setOutputText(result);
            setEditedText(result);
        } catch (err) {
            console.error('Error generating content:', err);
            setError("Ошибка при генерации контента.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!editedText) {
            setError("Пожалуйста, отредактируйте и подтвердите контент перед отправкой.");
            setLoading(false);
            return;
        }

        try {
            const isValid = await validateFinalContent(editedText);
            if (!isValid) {
                setError("Содержимое содержит ошибки или placeholders.");
                setLoading(false);
                return;
            }

            setStatus('Контент успешно отправлен!');

            await sendMessage(editedText, chatId.trim());
        } catch (err: any) {
            console.error('Ошибка при отправке контента:', err.message);
            setStatus(`Ошибка при отправке контента: ${err.message}`);
            setError(`Ошибка при отправке контента: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
            <Toolkit />
            <form onSubmit={handleSubmit} className="grid gap-1">
                <div className="w-full p-5 bg-white rounded-lg font-mono">
                    <div className='py-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
                        <textarea
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Введите описание для генерации контента"
                            id="description"
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='px-5 py-2 bg-white rounded-lg font-mono'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Chat ID</label>
                    <input
                        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                        placeholder="Chat ID"
                        type="text"
                        id="chatId"
                        value={chatId}
                        onChange={(e) => setChatId(e.target.value.trim())}
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-indigo-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                    {loading ? 'Генерация...' : 'Генерировать контент'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {status && <p>{status}</p>}
                {outputText && (
                    <>
                        <div ref={contentRef} className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                            <h2 className="text-lg font-medium text-gray-700">Сгенерированный контент</h2>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 bg-white"
                                rows={16}
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="relative px-8 py-2 mt-4 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                        >
                            {loading ? 'Сохранение...' : 'Подтвердить и отправить в чат'}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
