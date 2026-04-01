import './index.scss';

import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  PanelBody,
  PanelRow,
  ColorPalette,
  RangeControl,
  CheckboxControl,
  Spinner,
  Button,
  __experimentalHeading as Heading,
  NoticeList,
} from '@wordpress/components';

const latinate = {
  1: 'primary',
  2: 'secondary',
  3: 'tertiary',
  4: 'quaternary',
  5: 'quinary',
  6: 'senary',
  7: 'septenary',
  8: 'octonary',
  9: 'nonary',
  10: 'denary',
  11: 'undenary',
  12: 'duodenary',
};

const Notices = () => {
  const { removeNotice } = useDispatch( noticesStore );
  const notices = useSelect( ( select ) =>
    select( noticesStore ).getNotices()
  );

  if ( notices.length === 0 ) {
      return null;
  }

  return <NoticeList notices={ notices } onRemove={ removeNotice } />;
};

const OptionsPage = () => {
  const [ loadState, setLoadState ] = useState(false);
  const [ colourCount, setColourCount ] = useState(3);

  const [ colours, setColours ] = useState({
    primary: '#395786',
    secondary: '#a094b1',
    tertiary: '',
    quaternary: '',
    quinary: '',
    senary: '',
    septenary: '',
    octonary: '',
    nonary: '',
    denary: '',
    undenary: '',
    duodenary: '',
  });

  const [ supports, setSupports ] = useState({
    defaultPost: false,
    postRewrite: false,
    postCategory: false,
    postTag: false,
    comments: false,
  });

  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadState(true);

      setColourCount( settings.badeggcup.colourCount || 2);

      if(settings?.badeggcup?.colours) {
        setColours( settings.badeggcup.colours );
      }

      if(settings?.badeggcup?.supports) {
        setSupports( settings.badeggcup.supports );
      }

    } );
  }, [] );

  const saveSettings = () => {
    apiFetch( {
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          colours,
          colourCount,
          supports,
        }
      },
    }).then( () => {
      createSuccessNotice(
        __( 'Settings saved.', 'badeggcup' )
      );
    });
  };

  return (
    <>
      <Notices />

      <Heading level={ 1 }>
        { __( 'Website Options', 'badeggcup' ) }
      </Heading>

      <Panel>
        { (!loadState) ? <Spinner /> : (
          <>

            <PanelBody title={ __('Brand Colours', 'badeggcup') } className="badeggcup-brand-colours">
              <RangeControl
                __next40pxDefaultSize
                __nextHasNoMarginBottom
                label="Number of colours"
                value={ colourCount }
                onChange={ ( value ) => {
                  setColourCount( value );

                  for (let colour = value + 1; colour <= 12; colour++) {
                    setColours(prev => ({
                      ...prev,
                      [latinate[colour]]: '',
                    }));
                  }
                }}
                min={ 1 }
                max={ 12 }
              />
              <PanelRow>
                {
                  Object.keys(colours).map((colour, index) => {
                    const hex = colours[colour];

                    if(index < colourCount) {
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
              </PanelRow>
            </PanelBody>

            <PanelBody title={ __('Theme Support', 'badeggcup') } className="badeggcup-theme-supports">

              <CheckboxControl
                label={ __( 'Default Post Type', 'badeggcup' ) }
                checked={ supports.defaultPost }
                onChange={ ( value => {
                  setSupports({ ...supports, defaultPost: value });

                  if(!value) {
                    setSupports({
                      ...supports,
                      defaultPost: false,
                      postRewrite: false,
                      postCategory: false,
                      postTag: false,
                    });
                  }

                } ) }
                __nextHasNoMarginBottom
              />

              {
                (supports.defaultPost) ? (
                  <>
                    <CheckboxControl
                      label={ __( 'Post Rewrites', 'badeggcup' ) }
                      checked={ supports.postRewrite }
                      onChange={ ( value => setSupports({ ...supports, postRewrite: value }) ) }
                      __nextHasNoMarginBottom
                    />
                    <CheckboxControl
                      label={ __( 'Post Tags', 'badeggcup' ) }
                      checked={ supports.postTag }
                      onChange={ ( value => setSupports({ ...supports, postTag: value }) ) }
                      __nextHasNoMarginBottom
                    />
                    <CheckboxControl
                      label={ __( 'Post Categories', 'badeggcup' ) }
                      checked={ supports.postCategory }
                      onChange={ ( value => setSupports({ ...supports, postCategory: value }) ) }
                      __nextHasNoMarginBottom
                    />
                  </>
                ) : null
              }

              <CheckboxControl
                label={ __( 'Comments', 'badeggcup' ) }
                checked={ supports.comments }
                onChange={ ( value => setSupports({ ...supports, comments: value }) ) }
                __nextHasNoMarginBottom
              />
            </PanelBody>
          </>
        )}
      </Panel>

      <Button variant="primary" onClick={ saveSettings } __next40pxDefaultSize>
        { __( 'Save', 'badeggcup' ) }
      </Button>
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
