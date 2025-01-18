import { Button, HStack } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function FooterLanguageButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const createUrlWithLanguage = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    let basePath = pathname;
    if (pathname.startsWith('/hr/') || pathname.startsWith('/en/')) {
      basePath = pathname.substring(3);
    } else if (pathname === '/hr' || pathname === '/en') {
      basePath = '/';
    }

    const newUrl = `/${lang}${basePath}${params.toString() ? `?${params.toString()}` : ''}`;
    
    return newUrl;
  };

  return (
    <HStack spacing={3}>
      <Button
        colorScheme="blue"
        variant="outline"
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={() => {
          router.push(createUrlWithLanguage('hr'));
        }}
      >
        🇭🇷
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={() => {
          router.push(createUrlWithLanguage('en'));
        }}
      >
        🇬🇧
      </Button>
    </HStack>
  );
}