'use client';
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import Toolkit from "../components/Toolkit";
import { validateContent } from "../config/gemini";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function GenerateStatement() {
  const [recipient, setRecipient] = useState<string>("");
  const [leaderName, setLeaderName] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [numPeople, setNumPeople] = useState<number>(1);
  const [peopleNames, setPeopleNames] = useState<string[]>([""]);
  const [resources, setResources] = useState<{ name: string, cost: number }[]>([
    { name: 'Проезд, переезд', cost: 0 },
    { name: 'Суточные', cost: 0 },
    { name: 'Обеспечение НУУ', cost: 0 },
  ]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [generatedStatement, setGeneratedStatement] = useState<string>("");

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedStatement && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedStatement]);

  useEffect(() => {
    const total = resources.reduce((sum, resource) => sum + resource.cost, 0);
    setTotalCost(total);
  }, [resources]);

  const handleResourceChange = (index: number, value: number) => {
    const newResources = [...resources];
    newResources[index].cost = value;
    setResources(newResources);
  };

  const handlePeopleNamesChange = (index: number, value: string) => {
    const newPeopleNames = [...peopleNames];
    newPeopleNames[index] = value;
    setPeopleNames(newPeopleNames);
  };

  const handleGenerateStatement = async () => {
    const isValid = await validateContent(eventDescription);
    if (!isValid) {
      alert("Описание содержит запрещенные слова или фразы.");
      return;
    }

    const statement = `
      ${recipient}
      От руководителя
      ${leaderName}

      Заявление

      Прошу Вас проспонсировать поездку на "${eventTitle}", приуроченной развитию и обучению студентов. ${eventDescription}. 
      
      Цель поездки - участие наших студентов в данном мероприятии, которое успешно проходит каждый год. Также, студенты будут соревноваться по разработке MVP по направлению AI App track и Game AI track, который требует присутствия студентов.

      Количество участников: ${numPeople}
      Участники: ${peopleNames.join(', ')}
      
      Необходимые средства:
      ${resources.map(resource => `${resource.name} - ${resource.cost} тг`).join('\n')}

      ИТОГО: ${totalCost} тг

      ${eventDate}
      ${leaderName}
    `;
    setGeneratedStatement(statement);
    generatePDF(statement);
  };

  const generatePDF = (statement: string) => {
    const docDefinition = {
      content: [
        { text: statement, fontSize: 12 }
      ]
    };
    pdfMake.createPdf(docDefinition).download('statement.pdf');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
      <Toolkit />
      <form onSubmit={(e: FormEvent) => e.preventDefault()} className="grid gap-1">
        <div className="w-full p-5 bg-white rounded-lg font-mono">
          <div className='py-2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">Кому</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Кому"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className='py-2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">Имя лидера</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Имя лидера"
              type="text"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Название мероприятия</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Название мероприятия"
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Описание мероприятия</label>
            <textarea
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Описание мероприятия"
              rows={4}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Место проведения</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Место проведения"
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Дата мероприятия</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Дата мероприятия"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Количество участников</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="number"
              min="1"
              value={numPeople}
              onChange={(e) => {
                setNumPeople(Number(e.target.value));
                setPeopleNames(Array(Number(e.target.value)).fill(""));
              }}
              required
            />
          </div>
        </div>
        {peopleNames.map((name, index) => (
          <div key={index} className='p-5'>
            <div className="w-full bg-white rounded-lg font-mono">
              <label className="block text-gray-700 text-sm font-bold mb-2">{`ФИО участника ${index + 1}`}</label>
              <input
                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder={`ФИО участника ${index + 1}`}
                type="text"
                value={name}
                onChange={(e) => handlePeopleNamesChange(index, e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Необходимые средства</label>
            {resources.map((resource, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-1/2">{resource.name}</span>
                <input
                  type="number"
                  className="text-sm custom-input w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                  value={resource.cost}
                  onChange={(e) => handleResourceChange(index, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='p-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Общая стоимость</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="text"
              value={`${totalCost} тг`}
              readOnly
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleGenerateStatement}
          className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-indigo-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
        >
          Генерировать заявление
        </button>
        {generatedStatement && (
          <div ref={contentRef} className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-medium text-gray-700">Сгенерированное заявление</h2>
            <pre className="whitespace-pre-wrap">{generatedStatement}</pre>
            <button
              onClick={() => generatePDF(generatedStatement)}
              className="mt-2 text-indigo-600 hover:underline"
            >
              Скачать PDF
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
