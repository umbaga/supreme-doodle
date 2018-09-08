-- FUNCTION: public.get_at_levels_list(bigint)

-- DROP FUNCTION public.get_at_levels_list(bigint);

CREATE OR REPLACE FUNCTION public.get_at_levels_list(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(itmlnk."targetId")
FROM adm_link lnk
INNER JOIN adm_link itmlnk ON itmlnk."referenceId" = lnk."targetId"
WHERE lnk."referenceId" = $1
AND lnk."typeId" = 2938
$BODY$;

ALTER FUNCTION public.get_at_levels_list(bigint)
    OWNER TO postgres;
