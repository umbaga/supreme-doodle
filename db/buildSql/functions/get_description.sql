-- FUNCTION: public.get_description(bigint, bigint)

-- DROP FUNCTION public.get_description(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_description(
	"itemId" bigint,
	"typeId" bigint)
    RETURNS character varying
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT CASE WHEN count(dsc."description") = 0 THEN '' ELSE dsc."description" END
FROM adm_core_description dsc
INNER JOIN adm_link lnk ON lnk."targetId" = dsc.id
WHERE lnk."referenceId" = $1
AND dsc."typeId" = $2
AND lnk."typeId" = 16
GROUP BY dsc."description"
LIMIT 1

$BODY$;

ALTER FUNCTION public.get_description(bigint, bigint)
    OWNER TO postgres;
