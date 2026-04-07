import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fontAwesomeIconClassNames } from '../lib/fontAwesomeData';
import validateURL from '../lib/validateURL';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardDivider,
  TextControl,
  FormTokenField,
  Spinner,
  Button,
  __experimentalSpacer as Spacer,
} from '@wordpress/components';

export default function SectionSocials({ company, setCompany })
{
  const [ loadedSocials, setLoadedSocials ] = useState(false);

  library.add(fab);

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadedSocials(true);

      if(settings?.badeggcup?.company) {
        setCompany( settings.badeggcup.company );
      }
    } );
  }, [] );

  return (
    <PanelBody title={ __('Company Social Channels', 'badeggcup') } className="badeggcup-company-socials">
      { !loadedSocials ? <Spinner /> : (
        <>
          { company.socials.map( (social, index) => {
            return (
              <>
                <Card key={ index } className="badeggcup-social-row">
                  <Flex align="stretch" className="badeggcup-social-row-inner">
                    <CardHeader className="badeggcup-social-row-icon">
                      { validateURL(social.link) ? (
                        <a href={ social.link } target="_blank">
                          <FontAwesomeIcon icon={ `fa-brands fa-${ social.icon }` } size="3x" />
                        </a>
                      ) : (
                        <FontAwesomeIcon icon={ `fa-brands fa-${ social.icon }` } size="3x" />
                      ) }
                    </CardHeader>

                    <CardDivider orientation="vertical" />

                    <CardBody className="badeggcup-social-row-body">
                      <Flex align="stretch" gap="4">
                        <FormTokenField
                          className="badeggcup-social-input-icon"
                          __next40pxDefaultSize
                          __nextHasNoMarginBottom
                          label={ __('Search for an icon', 'badeggcup') }
                          onChange={ (value) => {
                            const icon = value[0];

                            setCompany(prev => {
                              const newSocials = [...prev.socials];
                              newSocials[index] = {
                                ...newSocials[index],
                                icon: icon,
                              };

                              return {
                                ...prev,
                                socials: newSocials,
                              };
                            });

                          }}
                          suggestions={ fontAwesomeIconClassNames(fab) }
                          maxLength="1"
                          value={ (social.icon) ? [ social.icon ] : [] }
                          __experimentalShowHowTo={ false }
                        />

                        {/* <CustomSelectControl
                            __next40pxDefaultSize
                            label={ __('Icon', 'badeggcup') }
                            options={ brandIconOptions }
                            value={ brandIconOptions.find( ( option ) => option.key === social.icon ) }
                            onChange={(value) => {

                              setCompany(prev => {
                                const newSocials = [...prev.socials];
                                newSocials[index] = {
                                  ...newSocials[index],
                                  icon: value.selectedItem.key,
                                };

                                return {
                                  ...prev,
                                  socials: newSocials,
                                };
                              });
                            }}
                        /> */}

                        <TextControl
                          className="badeggcup-social-input-link"
                          label={ __('Link', 'badeggcup') }
                          value={ social.link }
                          placeholder="https://..."
                          type="url"
                          onChange={ (value) => {
                            setCompany(prev => {
                              const newSocials = [...prev.socials];
                              newSocials[index] = {
                                ...newSocials[index],
                                link: value,
                              };

                              return {
                                ...prev,
                                socials: newSocials,
                              };
                            });
                          }}
                          __next40pxDefaultSize
                          __nextHasNoMarginBottom={ true }
                        />
                      </Flex>
                    </CardBody>

                    <CardDivider orientation="vertical" />

                    <CardFooter className="badeggcup-social-row-action">
                      <Button
                        variant="link"
                        isDestructive={ true }
                        size="small"
                        onClick={ () => setCompany( prev => {
                          const newSocials = prev.socials.filter((_, i) => i !== index)

                          return (
                            {
                              ...prev,
                              socials: newSocials,
                            }
                          )

                        })}
                        __next40pxDefaultSize
                      >
                        { __( 'Remove', 'badeggcup' ) }
                      </Button>
                    </CardFooter>
                  </Flex>
                </Card>
                <Spacer margin="4" />
              </>
            )
          }) }
        </>
      )}

      <Flex justify="flex-end">
        <Button
          variant="secondary"
          onClick={ () => setCompany( prev => ({
            ...prev,
            socials: [
              ...prev.socials,
              { icon: "", link: "" }
            ],
          }))}
          __next40pxDefaultSize
        >
          { __( 'Add another channel', 'badeggcup' ) }
        </Button>
      </Flex>

    </PanelBody>
  );
}
