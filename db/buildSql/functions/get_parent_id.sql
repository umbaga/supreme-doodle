-- FUNCTION: public.get_parent_id(bigint, bigint)

-- DROP FUNCTION public.get_parent_id(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_parent_id(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS bigint
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT parlnk."referenceId"
FROM adm_core_item i
LEFT OUTER JOIN adm_link parlnk ON parlnk."targetId" = i.id AND parlnk."typeId" = $2
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_parent_id(bigint, bigint)
    OWNER TO postgres;
