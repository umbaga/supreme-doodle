-- FUNCTION: public.get_proficiencies_assigned(bigint, bigint)

-- DROP FUNCTION public.get_proficiencies_assigned(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_proficiencies_assigned(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT CASE WHEN count(lnk."targetId") = 0 THEN NULL ELSE json_agg(json_build_object(
	'id', profi.id,
	'name', profi."itemName",
	'category', get_item(prof."categoryId")
)) END
FROM adm_core_item i
LEFT OUTER JOIN adm_link lnk ON lnk."referenceId" = i.id AND lnk."typeId" = $2
LEFT OUTER JOIN adm_core_item profi ON profi.id = lnk."targetId"
LEFT OUTER JOIN adm_def_proficiency prof ON prof."proficiencyId" = profi.id
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_proficiencies_assigned(bigint, bigint)
    OWNER TO postgres;
