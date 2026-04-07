import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Flex,
  ColorPalette,
  Spinner,
} from '@wordpress/components';

import latinate from '../json/latinate.json';

export default function SectionColours({ colours, setColours })
{
  const [ loadedColours, setLoadedColours ] = useState(false);

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      if(settings?.badeggcup?.colours) {
        setLoadedColours(true);
        setColours( settings.badeggcup.colours );
      }
    } );
  }, [] );

  return (
    <PanelBody title={ __('Brand Colours', 'badeggcup') } className="badeggcup-brand-colours">
      {
        (!loadedColours ? <Spinner /> : (
          <Flex align="flex-start" justify="flex-start" gap="4" wrap={ true }>
            {
              Object.keys(colours).map((colour, index) => {
                const hex = colours[colour];

                if(index == 0 || colours[latinate[index + 1]] || (index > 0 && colours[latinate[index]])) {
                  return (
                    <div className="badeggcup-brand-colours-item" key={ index }>
                      <h3>{ colour }</h3>
                      <ColorPalette
                        value={ hex }
                        clearable={ (index > 0) ? true : false }
                        onChange={ value => {
                          setColours( prev => ({
                            ...prev,
                            [colour]: value,
                          }));
                        }}
                        headingLevel={ 3 }
                      />

                    </div>
                  )
                }
              })
            }
          </Flex>
        ))
      }
    </PanelBody>
  );
}
