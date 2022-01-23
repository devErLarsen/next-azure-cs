
export default function TextResultBox({ sentiment, keyPhrases, translations }) {

    const colorSentiment = () => {
        if(sentiment === 'positive')
          return 'text-green-600'
        else if(sentiment === 'negative')
          return 'text-red-600'
        return 'text-yellow-200'
      }

    return (
        <>
            {(sentiment && keyPhrases.length > 0 && translations.length > 0) ? 
            <div className='flex flex-col text-center p-5 rounded shadow-md max-w-lg mb-6'>
                <h2 className='text-2xl text-gray-900 dark:text-white'>
                    Sentiment is <span className={colorSentiment()}>{sentiment}</span>
                </h2>
                
                <div>
                    <h2 className='text-2xl text-gray-900 dark:text-white mb-2'>Key phrases:</h2>
                    <p className='text-gray-900 dark:text-white'>{keyPhrases.join(' | ')}</p>
                </div>
                
                
                <div className="">
                    <h2 className='text-2xl text-gray-900 dark:text-white mb-2'>Translations:</h2>
                    {translations.map((l, i) => (
                    <p className='text-gray-900 dark:text-white text-justify ml-2' key={i}><b>{l.to}</b>: {l.text}</p>
                    ))}
                </div>
               
            </div>
                : 
            <></>
        }
        </>
    );
}