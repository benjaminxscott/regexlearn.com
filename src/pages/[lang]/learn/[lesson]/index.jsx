import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import SeoTags from 'src/components/SeoTags';
import LearnPage from 'src/components/LearnPage';

import { defaultLocale, locales } from 'src/localization';

import lessons from 'src/data/lessons/index.json';

export default function Course({ lessonName }) {
  const data = require(`src/data/lessons/${lessonName}`)?.default;

  const { query } = useRouter();

  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const title = formatMessage({ id: `lessons.${lessonName}.title` });

  const pageTitle = `${title} - ${query?.lang.toUpperCase()}`;
  const pageDescription = formatMessage({ id: `lessons.${lessonName}.description` });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="alternate" hrefLang="en" href={`https://regexlearn.com/learn/${lessonName}`} />
        <link
          rel="alternate"
          hrefLang="ru"
          href={`https://regexlearn.com/ru/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={`https://regexlearn.com/es/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="tr"
          href={`https://regexlearn.com/tr/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="zh-cn"
          href={`https://regexlearn.com/zh-cn/learn/${lessonName}`}
        />
        <SeoTags title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      <LearnPage data={data} lessonName={lessonName} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
      lessonName: params.lesson,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];

  locales.forEach(lang => {
    lessons.forEach(lesson => {
      paths.push({
        params: {
          lang,
          lesson: lesson.key,
        },
      });
    });
  });

  return {
    fallback: false,
    paths,
  };
}
