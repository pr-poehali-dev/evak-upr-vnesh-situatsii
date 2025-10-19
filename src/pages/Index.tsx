import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Index = () => {
  const { toast } = useToast();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Что категорически запрещено делать при обнаружении задымления в здании?',
      options: [
        'Открывать окна и двери',
        'Двигаться ползком ниже уровня дыма',
        'Закрыть дверь в помещении',
        'Позвонить в службу спасения'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Можно ли использовать лифт при эвакуации из горящего здания?',
      options: [
        'Да, это самый быстрый способ',
        'Нет, категорически запрещено',
        'Можно, если пожар на другом этаже',
        'Только если лифт работает'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Что делать, если выход заблокирован дымом?',
      options: [
        'Бежать через дым к выходу',
        'Оставаться на месте и закрыть дверь',
        'Прыгать из окна',
        'Кричать и ждать помощи в коридоре'
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'Правильное направление движения при эвакуации вниз по лестнице:',
      options: [
        'Бегом, чтобы быстрее выбраться',
        'Спокойно, держась за перила',
        'Перешагивая через ступени',
        'Толкая других людей'
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(
      q => selectedAnswers[q.id] === q.correctAnswer
    ).length;

    setShowResults(true);

    if (correctAnswers === totalQuestions) {
      toast({
        title: '🎉 Отлично!',
        description: `Вы ответили правильно на все ${totalQuestions} вопроса!`,
        className: 'bg-green-50 border-green-200'
      });
    } else {
      toast({
        title: 'Результаты теста',
        description: `Правильных ответов: ${correctAnswers} из ${totalQuestions}`,
        variant: correctAnswers >= totalQuestions / 2 ? 'default' : 'destructive'
      });
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-primary text-primary-foreground py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="AlertTriangle" size={36} className="text-destructive" />
            <h1 className="text-4xl font-bold">Правила Эвакуации</h1>
          </div>
          <p className="text-lg opacity-90">Образовательный портал о безопасности при чрезвычайных ситуациях</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="mb-12 animate-fade-in">
          <Card className="border-l-4 border-l-destructive shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="AlertCircle" size={28} className="text-destructive" />
                Актуальность темы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Знание правил эвакуации спасает жизни. Каждый год тысячи людей погибают из-за неправильных действий при пожарах и других чрезвычайных ситуациях. <strong>Паника, незнание базовых правил и критические ошибки</strong> становятся главными причинами трагедий.
              </p>
              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                <p className="font-semibold text-destructive mb-2">⚠️ Критически важно:</p>
                <p>90% несчастных случаев при эвакуации происходят из-за неправильных действий людей, а не из-за самого пожара.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Icon name="Users" size={32} className="mx-auto mb-2 text-accent" />
                  <p className="font-bold text-2xl text-accent">70%</p>
                  <p className="text-sm text-muted-foreground">травм из-за паники</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Icon name="Clock" size={32} className="mx-auto mb-2 text-accent" />
                  <p className="font-bold text-2xl text-accent">2-3 мин</p>
                  <p className="text-sm text-muted-foreground">критическое время</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Icon name="ShieldAlert" size={32} className="mx-auto mb-2 text-accent" />
                  <p className="font-bold text-2xl text-accent">100%</p>
                  <p className="text-sm text-muted-foreground">можно предотвратить</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Icon name="XCircle" size={32} className="text-destructive" />
            Типичные ошибки при эвакуации
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white shadow-md rounded-lg border-none px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive" className="text-base px-3 py-1">1</Badge>
                  Использование лифта
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base pt-4 pb-6 leading-relaxed">
                <div className="space-y-3">
                  <p><strong className="text-destructive">Почему опасно:</strong> При пожаре лифт может остановиться между этажами из-за отключения электричества. Лифтовая шахта становится дымоходом, быстро наполняясь ядовитым дымом.</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-2">✓ Правильно:</p>
                    <p className="text-green-900">Всегда используйте лестницу. Двигайтесь спокойно, держась за перила.</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Статистика: 15% погибших при пожарах были найдены в лифтах.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white shadow-md rounded-lg border-none px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive" className="text-base px-3 py-1">2</Badge>
                  Возвращение за вещами
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base pt-4 pb-6 leading-relaxed">
                <div className="space-y-3">
                  <p><strong className="text-destructive">Почему опасно:</strong> Огонь и дым распространяются с невероятной скоростью. За минуту ситуация может измениться критически - безопасный путь станет смертельной ловушкой.</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-2">✓ Правильно:</p>
                    <p className="text-green-900">Покинув опасную зону, никогда не возвращайтесь назад. Никакие вещи не стоят вашей жизни.</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Правило спасателей: "Вышел - не возвращайся!"</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white shadow-md rounded-lg border-none px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive" className="text-base px-3 py-1">3</Badge>
                  Паника и бег
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base pt-4 pb-6 leading-relaxed">
                <div className="space-y-3">
                  <p><strong className="text-destructive">Почему опасно:</strong> Паника приводит к давке, падениям на лестницах и неправильным решениям. Люди теряют ориентацию и могут бежать не к выходу, а вглубь здания.</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-2">✓ Правильно:</p>
                    <p className="text-green-900">Сохраняйте спокойствие. Двигайтесь быстро, но без бега. Помогайте другим, особенно детям и пожилым.</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Спокойная эвакуация в 5 раз эффективнее панической.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white shadow-md rounded-lg border-none px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive" className="text-base px-3 py-1">4</Badge>
                  Открывание окон и дверей
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base pt-4 pb-6 leading-relaxed">
                <div className="space-y-3">
                  <p><strong className="text-destructive">Почему опасно:</strong> Приток кислорода усиливает горение в разы. Огонь моментально увеличивается в размерах, а дым начинает распространяться с удвоенной скоростью.</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-2">✓ Правильно:</p>
                    <p className="text-green-900">Закрывайте за собой двери. Если выход отрезан дымом, закройте дверь в комнату, уплотните щели влажной тканью.</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Закрытая дверь может сдержать огонь до 30 минут.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Ban" size={32} className="text-destructive" />
            Что категорически НЕЛЬЗЯ делать
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-destructive shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Flame" size={24} className="text-destructive" />
                  При пожаре
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Тушить водой электроприборы под напряжением</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Разбивать окна (создаёт приток воздуха)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Прятаться под кроватями, в шкафах</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Передвигаться в полный рост в задымлении</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Прыгать из окон выше 3 этажа</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-destructive shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={24} className="text-destructive" />
                  При массовой эвакуации
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Двигаться против потока людей</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Останавливаться в узких проходах</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Наклоняться, поднимать упавшие вещи</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Толкаться, создавать давку</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-destructive font-bold">✗</span>
                    <span>Кричать и создавать панику</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Siren" size={32} className="text-accent" />
            Работа спасателей
          </h2>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Как действуют профессионалы</CardTitle>
              <CardDescription>Принципы работы спасательных служб при эвакуации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Оценка ситуации</h3>
                      <p className="text-sm text-muted-foreground">Спасатели первым делом определяют масштаб ЧС, количество пострадавших и наиболее опасные зоны.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Организация потоков</h3>
                      <p className="text-sm text-muted-foreground">Направляют людей по безопасным маршрутам, предотвращают давку и панику.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Поиск пострадавших</h3>
                      <p className="text-sm text-muted-foreground">Обследуют все помещения, включая труднодоступные места, используя тепловизоры.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Помощь маломобильным</h3>
                      <p className="text-sm text-muted-foreground">Приоритетная эвакуация детей, пожилых людей и людей с ограниченными возможностями.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Первая помощь</h3>
                      <p className="text-sm text-muted-foreground">Оказание медицинской помощи пострадавшим от дыма, ожогов и травм.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Контроль территории</h3>
                      <p className="text-sm text-muted-foreground">Не допускают возвращения людей в опасную зону до полной ликвидации угрозы.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 mt-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-accent" />
                  Важно знать
                </h3>
                <p className="mb-3">Спасатели обучены действовать в условиях ограниченной видимости, высоких температур и стресса. Их главная задача - сохранить максимальное количество жизней.</p>
                <p className="text-sm font-semibold text-accent">💡 Всегда следуйте указаниям спасателей - они знают, как действовать в экстремальных ситуациях!</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Icon name="ClipboardCheck" size={32} className="text-accent" />
            Проверка знаний
          </h2>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Тест: Правила безопасной эвакуации</CardTitle>
              <CardDescription>Проверьте свои знания о правилах эвакуации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="border-b pb-6 last:border-b-0">
                  <p className="font-semibold mb-4 text-lg">
                    <Badge className="mr-2">{q.id}</Badge>
                    {q.question}
                  </p>
                  <RadioGroup
                    value={selectedAnswers[q.id]?.toString()}
                    onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                    disabled={showResults}
                  >
                    {q.options.map((option, index) => {
                      const isSelected = selectedAnswers[q.id] === index;
                      const isCorrect = q.correctAnswer === index;
                      const showFeedback = showResults && isSelected;

                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                            showFeedback
                              ? isCorrect
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                          <Label htmlFor={`q${q.id}-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {showFeedback && (
                            <Icon
                              name={isCorrect ? 'CheckCircle2' : 'XCircle'}
                              size={20}
                              className={isCorrect ? 'text-green-600' : 'text-red-600'}
                            />
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                {!showResults ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length !== questions.length}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Проверить ответы
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" size="lg">
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Пройти заново
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 shadow-lg">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <Icon name="Phone" size={48} className="mx-auto text-destructive" />
                <h3 className="text-2xl font-bold">Экстренные службы</h3>
                <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-3xl font-bold text-destructive">101</p>
                    <p className="text-sm text-muted-foreground">Пожарная служба</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-3xl font-bold text-destructive">112</p>
                    <p className="text-sm text-muted-foreground">Единый номер</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-3xl font-bold text-destructive">103</p>
                    <p className="text-sm text-muted-foreground">Скорая помощь</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pt-4">
                  При звонке сохраняйте спокойствие, чётко назовите адрес и опишите ситуацию
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">💡 Знание правил эвакуации может спасти вашу жизнь и жизни окружающих</p>
          <p className="text-sm opacity-75">Образовательный портал о безопасности • 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
